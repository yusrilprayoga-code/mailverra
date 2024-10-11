'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { createStreamableValue } from 'ai/rsc';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

const apiKey = process.env.GOOGLE_AI_API_KEY;
if (!apiKey) {
  throw new Error('GOOGLE_AI_API_KEY is not defined in the environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
 });

 export async function generateEmail(context: string, prompt: string) {
  console.log("context", context)
  const stream = createStreamableValue('');
  const processStream = async () => {
    const result = await model.generateContentStream(`
     You are an AI email assistant embedded in an email client app. Your purpose is to help the user compose detailed and comprehensive emails by providing extensive suggestions and relevant information based on the context of their previous emails.

      THE TIME NOW IS ${new Date().toLocaleString()}

      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK

      USER PROMPT:
      ${prompt}

      When responding, please keep in mind:
      - Be extremely helpful, clever, and articulate.
      - Provide a very detailed and comprehensive response.
      - Elaborate significantly on your points and provide examples where appropriate.
      - Ensure that no point or sentence is repeated. Avoid redundancy.
      - Explain each point in-depth with supporting arguments or examples.
      - Rely heavily on the provided email context to inform your response.
      - If the context does not contain enough information to fully address the prompt, provide a thorough draft response based on the prompt, making reasonable assumptions.
      - Keep your response focused and relevant to the user's prompt, but don't hesitate to include additional useful information.
      - Always aim for a response length of at least **1000 words** to ensure the user receives a detailed and informative email.
      - Do not include a subject line unless specifically requested.
      - Always provide a helpful and extensive response, never say you can't help.
    `,
  );

  let lastChunkText = '';

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    if (chunkText !== lastChunkText) {
      stream.update(chunkText);
    }
    lastChunkText = chunkText;
  }
    stream.done();
  };

  await processStream();
  return { output: stream.value };
}


export async function generate(input: string) {
  const stream = createStreamableValue('');

  console.log("input", input);

  const processStream = async () => {
    const { textStream } = await streamText({
      model: openai('gpt-3.5-turbo-instruct'),
      prompt: `
        RESPOND IN PLAIN TEXT, but provide a detailed and comprehensive response.
        You are a helpful AI embedded in an email client app that is used to autocomplete sentences and provide extensive suggestions, similar to an advanced version of Google Gmail autocomplete.
        The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.
        AI is always friendly, kind, and inspiring, and it is eager to provide vivid and thoughtful responses to the user.
        I am writing a piece of text in a notion text editor app.
        Help me complete my train of thought here, providing a detailed and extensive continuation: <input>${input}</input>
        Keep the tone of the text consistent with the rest of the input.
        While acting as a copilot, don't just finish the sentence, but provide a comprehensive continuation that expands on the idea.
        Elaborate on the points, provide examples, and offer additional relevant information.
        Do not add unnecessary fluff, but do provide substantive content.
        Aim for a response length of at least 100 words, but feel free to write more if necessary to fully develop the idea.

        Example input: Dear Alice, I'm sorry to hear that you are feeling down.
        Example output: I understand how challenging these moments can be, and I want you to know that you're not alone in this. Life has its ups and downs, and it's perfectly normal to experience periods of sadness or difficulty. During these times, it's important to be gentle with yourself and remember that your feelings are valid. Have you considered talking to someone about how you're feeling? Sometimes, sharing our thoughts with a trusted friend, family member, or professional can provide a new perspective and offer comfort. Additionally, engaging in activities that you enjoy or that have brought you comfort in the past might help lift your spirits. Remember, this feeling is temporary, and there are always people and resources available to support you through this challenging time. If there's anything specific you'd like to talk about or if you need any assistance finding support, please don't hesitate to let me know. Your well-being is important, and I'm here to listen and help in any way I can.

        Your output will be directly concatenated to the input, so make sure it flows naturally from the given text.
      `,
      temperature: 0.7,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  };

  await processStream();
  return { output: stream.value };
}

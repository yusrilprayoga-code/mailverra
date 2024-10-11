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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateEmail(context: string, prompt: string) {
    console.log("context", context)
    const stream = createStreamableValue('');
    const processStream = async () => {

        const result = await model.generateContentStream(`
            You are an AI email assistant embedded in an email client app. Your purpose is to help the user compose emails by providing suggestions and relevant information based on the context of their previous emails.
            
            THE TIME NOW IS ${new Date().toLocaleString()}
            
            START CONTEXT BLOCK
            ${context}
            END OF CONTEXT BLOCK
            
            USER PROMPT:
            ${prompt}
            
            When responding, please keep in mind:
            - Be helpful, clever, and articulate. 
            - Rely on the provided email context to inform your response.
            - If the context does not contain enough information to fully address the prompt, provide a general draft response based on the prompt.
            - Keep your response focused and relevant to the user's prompt.
            - Directly output the email content, no need for introductions or explanations.
            - Do not include a subject line unless specifically requested.
            - Always provide a helpful response, never say you can't help.
        `);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            stream.update(chunkText);
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
            model: openai('gpt-3.5-turbo'),
            prompt: `
            ALWAYS RESPOND IN PLAIN TEXT, no html or markdown.
            You are a helpful AI embedded in a email client app that is used to autocomplete sentences, similar to google gmail autocomplete
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
            I am writing a piece of text in a notion text editor app.
            Help me complete my train of thought here: <input>${input}</input>
            keep the tone of the text consistent with the rest of the text.
            keep the response short and sweet. Act like a copilot, finish my sentence if need be, but don't try to generate a whole new paragraph.
            Do not add fluff like "I'm here to help you" or "I'm a helpful AI" or anything like that.

            Example:
            Dear Alice, I'm sorry to hear that you are feeling down.

            Output: Unfortunately, I can't help you with that.

            Your output is directly concatenated to the input, so do not add any new lines or formatting, just plain text.
            `,
        });

        for await (const delta of textStream) {
            stream.update(delta);
        }

        stream.done();
    };

    // Await stream processing
    await processStream();

    return { output: stream.value };
}
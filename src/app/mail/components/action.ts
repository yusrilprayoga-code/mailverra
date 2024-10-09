'use server'

import {streamText} from 'ai'
import {openai} from '@ai-sdk/openai'
import {createStreamableValue} from 'ai/rsc'

export async function generateEmail(context: string, prompt:string) {
    const stream = createStreamableValue('');
    (
        async () => {
            const {textStream} = await streamText({
                model: openai('gpt-4-turbo'),
                prompt: `
                    You are an AI email assistant embedded in an email client app. Your purpose is to help users compose emails.

                    THE TIME NOW IS ${new Date().toLocaleTimeString()}

                    START CONTEXT BLOCK
                    ${context}
                    END CONTEXT BLOCK

                    USER PROMPT:
                    ${prompt}

                    When responding, please keep in mind:
                    - Be helpful, clever, and articulate
                    - Reply on the provided email context to inform your response
                    - If the context does not contain enough informastion to fully address the prompt, politely ask the user for more information.
                    - Avoid apologizing for previous responses. Instead, indicate that you have updated your response based on new information.
                    - Do not invent or speculate about anything that is not directly supported by the email context.
                    - Keep your response focused and relevant to user's prompt
                    - Don't add fluff like 'Heres your email' or 'Here's your email' or anything like the following
                    - Directly output the email, no need to say 'Here is your email; or anything like the following
                    - No need to output subject
                `
            })
            for await (const token of textStream) {
                stream.update(token)
            }

            stream.done()
        }
    )()

    return {output: stream.value}
}
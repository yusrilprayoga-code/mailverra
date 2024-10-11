'use client'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Text} from '@tiptap/extension-text'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import TagInput from './tag-input'
import { Input } from '@/components/ui/input'
import AiComposeButton from './ai-compose-button'
import { readStreamableValue } from 'ai/rsc'
import { generate } from './action'
import TipTapMenuBar from './editor-menubar'
import React from 'react'

type Props = {
    subject: string
    setSubject: (value:string) => void

    toValues: {label:string, value:string}[]
    setToValues: (value: {label:string, value:string}[]) => void 

    ccValues: {label:string, value:string}[]
    setCcValues: (value: {label:string, value:string}[]) => void

    to: string[]

    handleSend: (value:string) => void
    isSending: boolean

    defaultToolbarExpanded?: boolean
}

const EmailEditor = ({
    subject, 
    setSubject, 
    toValues, 
    setToValues, 
    ccValues, 
    setCcValues, 
    to, 
    handleSend,
    isSending, 
    defaultToolbarExpanded = false
}: Props) => {
    const [value, setValue] = React.useState<string>('');
    const [expanded, setExpanded] = React.useState(defaultToolbarExpanded);
    const [generation, setGeneration] = React.useState('');
    const [isGenerating, setIsGenerating] = React.useState(false);

    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                "Meta-j": () => {
                    aiGenerate(this.editor.getText());
                    return true;
                },
            };
        },
    });

    const editor = useEditor({
        autofocus: false,
        extensions: [StarterKit, customText,],
        onUpdate: ({ editor }) => {
            setValue(editor.getHTML());
        }
    });
    
    const aiGenerate = async (prompt: string) => {
        try {
            setIsGenerating(true);
            const { output } = await generate(prompt);
    
            for await (const delta of readStreamableValue(output)) {
                if (delta) {
                    setGeneration(prev => prev + delta);
                }
            }
        } catch (error) {
            console.error("Error during AI generation:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleAiCompose = (generatedText: string) => {
        if (editor) {
            editor.commands.insertContent(generatedText);
        }
    };

    return (
        <div>
            <div className="flex p-4 py-2 border-b">
                {editor && <TipTapMenuBar editor={editor} />}
            </div>

            <div className="p-4 pb-0 space-y-2">
                {expanded && (
                    <>
                        <TagInput 
                            label='To'
                            placeholder='Type email address'
                            onChange={setToValues}
                            value={toValues}
                        />
                        <TagInput 
                            label='Cc'
                            placeholder='Add Recipients'
                            onChange={setCcValues}
                            value={ccValues}
                        />
                        <Input id='subject' placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </>
                )}
                <div className="flex items-center gap-2">
                    <div className="cursor-pointer" onClick={() => setExpanded(e => !e)}>
                        <span className="text-green-600 font-medium">Draft </span>
                        <span>to {to.join(', ')}</span>
                    </div>
                    <AiComposeButton
                        isComposing={defaultToolbarExpanded}
                        onGenerate={handleAiCompose}
                    />
                </div>
            </div>

            <div className="prose w-full px-4 relative">
                <EditorContent value={value} editor={editor}  />
                {isGenerating && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                        <div className="text-lg font-semibold text-gray-700">
                            AI is generating...
                        </div>
                    </div>
                )}
            </div>
            <Separator />
            <div className="py-3 px-4 flex items-center justify-between">
                <span className="text-sm">
                    Tip: Press{" "}
                    <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                        Cmd + J
                    </kbd>{" "}
                    for AI autocomplete
                </span>
                <Button onClick={async () => { editor?.commands.clearContent(); await handleSend(value) }} disabled={isSending || isGenerating}>
                    {isSending ? 'Sending...' : 'Send'}
                </Button>
            </div>
        </div>
    );
};

export default EmailEditor;
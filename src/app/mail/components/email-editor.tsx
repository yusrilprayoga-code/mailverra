'use client'
import React from 'react'
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {Text} from '@tiptap/extension-text'
import EditorMenuBar from './editor-menubar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import TagInput from './tag-input'
import { Input } from '@/components/ui/input'
import AiComposeButton from './ai-compose-button'

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
    const [value, setValue] = React.useState<string>('')
    const [expanded, setExpanded] = React.useState<boolean>(defaultToolbarExpanded)

    const CustomText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'Meta-j' : () => {
                    console.log('Meta-j')
                    return true
                }
            }
        }
    })

    const editor = useEditor({
        autofocus: false,
        extensions: [StarterKit, CustomText],
        onUpdate: ({ editor }) => {
            setValue(editor.getHTML())
        }
    })
    
    const onGenerate = (token:string) => {
        console.log(token)
        editor?.commands?.insertContent(token)
    }

    if(!editor) return null


  return (
    <div>
        <div className='p-4 py-2 flex border-b'>
            <EditorMenuBar editor={editor} />
        </div>

        <div className='p-4 pb-0 space-y-2 '>
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

            <div className='flex items-center gap-2'>
                <div className='cursor-pointer' onClick={() => setExpanded(!expanded)}>
                    <span className='text-green-600 font-medium'>
                        Draft {""}
                    </span>
                    <span>
                        to {to.join(', ')}
                    </span>
                </div>
                <AiComposeButton
                    isComposing={defaultToolbarExpanded}
                    onGenerate={onGenerate}
                />
            </div>
        </div>

        <div className='prose w-full px-4'>
            <EditorContent editor={editor} value={value} />
        </div>

        <Separator />

        <div className='py-3 px-4 flex items-center justify-between'>
            <span className='text-sm'>
                Tip: Press {" "}
                <kbd className='px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg'>
                    Cmd + J
                </kbd>
                for AI autocomplete
            </span>
            <Button onClick={ async () => {
                editor?.commands?.clearContent()
                await handleSend(value)
            }} disabled={isSending}>
                Send
            </Button>
        </div>
    </div>
  )
}

export default EmailEditor
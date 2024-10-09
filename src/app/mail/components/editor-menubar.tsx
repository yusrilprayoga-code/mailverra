import React from 'react'
import { type Editor } from '@tiptap/react'
import { Bold } from 'lucide-react'

type Props = {
    editor: Editor
}

const EditorMenuBar = ({editor}: Props) => {
  return (
    <div className='flex flex-wrap gap-2'>
        <button 
            onClick={() => {
                editor.chain().focus().toggleBold().run()
            }}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'isActive' : ''}
        >
            <Bold className='size-4 text-secondary-foreground' />
        </button>
    </div>
  )
}

export default EditorMenuBar
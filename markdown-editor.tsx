'use client';

// Tiptap core extensions
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { EditorContent, EditorContext, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

import { HorizontalRule, ImageUploadNode } from './components';
// import { loggers } from '@/lib/log/logger';

// Hooks
import { useIsMobile } from './hooks/use-mobile'; // Modular local hook

// Utilities
import { handleImageUpload, MAX_FILE_SIZE } from './lib/utils';

// Styles
import './components/node/blockquote-node/blockquote-node.scss';
import './components/node/code-block-node/code-block-node.scss';
import './components/node/heading-node/heading-node.scss';
import './components/node/horizontal-rule-node/horizontal-rule-node.scss';
import './components/node/image-node/image-node.scss';
import './components/node/list-node/list-node.scss';
import './components/node/paragraph-node/paragraph-node.scss';

import { useEffect } from 'react';

import './styles/markdown-editor.scss';

import { cn } from './lib/cn';
import { MarkdownEditorToolbar } from './markdown-editor-toolbar';

export interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const isMobile = useIsMobile();

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': placeholder || 'Course description editor',
        class: 'markdown-editor'
      }
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true
        }
      }),
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: error => console.error('Upload failed', error)
      })
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    }
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML())
      editor.commands.setContent(value);
  }, [editor, value]);

  return (
    <div
      className={cn(
        'markdown-editor flex w-full min-w-0 flex-col overflow-hidden rounded-md',
        'border border-input bg-transparent dark:bg-input/30',
        'shadow-xs transition-[color,box-shadow] outline-none',
        'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50'
      )}
    >
      <EditorContext.Provider value={{ editor }}>
        <MarkdownEditorToolbar
          className='markdown-editor-toolbar rounded-t-md border-b border-input bg-muted/50 dark:bg-input/30'
          isMobile={isMobile}
        />

        <EditorContent
          className='markdown-editor-content px-3 py-2 text-base md:text-sm'
          editor={editor}
          role='presentation'
        />
      </EditorContext.Provider>
    </div>
  );
}

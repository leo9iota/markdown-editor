'use client';

import { useEffect, useState } from 'react';

import {
  ArrowLeftIcon,
  BlockquoteButton,
  Button,
  CodeBlockButton,
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent,
  HeadingDropdownMenu,
  HighlighterIcon,
  ImageUploadButton,
  LinkButton,
  LinkContent,
  LinkIcon,
  LinkPopover,
  ListDropdownMenu,
  MarkButton,
  Spacer,
  TextAlignButton,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  UndoRedoButton
} from './components';

interface MarkdownEditorToolbarProps {
  isMobile: boolean;
  className?: string;
}

const MainToolbar = ({
  onHighlighterClick,
  onLinkClick,
  isMobile
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action='undo' />
        <UndoRedoButton action='redo' />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={true} />
        <ListDropdownMenu portal={true} types={['bulletList', 'orderedList', 'taskList']} />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type='bold' />
        <MarkButton type='italic' />
        <MarkButton type='strike' />
        <MarkButton type='code' />
        <MarkButton type='underline' />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type='superscript' />
        <MarkButton type='subscript' />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align='left' />
        <TextAlignButton align='center' />
        <TextAlignButton align='right' />
        <TextAlignButton align='justify' />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text='Add' />
      </ToolbarGroup>

      <Spacer />
    </>
  );
};

const MobileToolbar = ({ type, onBack }: { type: 'highlighter' | 'link'; onBack: () => void }) => (
  <>
    <ToolbarGroup>
      <Button data-style='ghost' onClick={onBack}>
        <ArrowLeftIcon className='tiptap-button-icon' />
        {type === 'highlighter' ? (
          <HighlighterIcon className='tiptap-button-icon' />
        ) : (
          <LinkIcon className='tiptap-button-icon' />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? <ColorHighlightPopoverContent /> : <LinkContent />}
  </>
);

export function MarkdownEditorToolbar({ isMobile, className }: MarkdownEditorToolbarProps) {
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>('main');

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') setMobileView('main');
  }, [isMobile, mobileView]);

  return (
    <Toolbar
      className={[
        'flex w-full items-center gap-1 px-2 py-1',
        // match Input/Toolbar look and focus styles via container
        className
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {mobileView === 'main' ? (
        <MainToolbar
          isMobile={isMobile}
          onHighlighterClick={() => setMobileView('highlighter')}
          onLinkClick={() => setMobileView('link')}
        />
      ) : (
        <MobileToolbar
          type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
          onBack={() => setMobileView('main')}
        />
      )}
    </Toolbar>
  );
}

'use client';

import * as React from 'react';

import { Badge } from '../../../components/common/badge';
// --- UI Primitives ---
import type { ButtonProps } from '../../../components/common/button';
import { Button } from '../../../components/common/button';
// --- Tiptap UI ---
import type { UseBlockquoteConfig } from '../../../components/ui/blockquote-button/index';
import {
  BLOCKQUOTE_SHORTCUT_KEY,
  useBlockquote
} from '../../../components/ui/blockquote-button/index';
// --- Hooks ---
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor';
// --- Lib ---
import { parseShortcutKeys } from '../../../lib/utils';

export interface BlockquoteButtonProps extends Omit<ButtonProps, 'type'>, UseBlockquoteConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string;
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean;
}

export function BlockquoteShortcutBadge({
  shortcutKeys = BLOCKQUOTE_SHORTCUT_KEY
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for toggling blockquote in a Tiptap editor.
 *
 * For custom button implementations, use the `useBlockquote` hook instead.
 */
export const BlockquoteButton = React.forwardRef<HTMLButtonElement, BlockquoteButtonProps>(
  (
    {
      editor: providedEditor,
      text,
      hideWhenUnavailable = false,
      onToggled,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canToggle, isActive, handleToggle, label, shortcutKeys, Icon } =
      useBlockquote({
        editor,
        hideWhenUnavailable,
        ...(onToggled !== undefined && { onToggled })
      });

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleToggle();
      },
      [handleToggle, onClick]
    );

    if (!isVisible) {
      return null;
    }

    return (
      <Button
        aria-label={label}
        aria-pressed={isActive}
        data-active-state={isActive ? 'on' : 'off'}
        data-disabled={!canToggle}
        data-style='ghost'
        disabled={!canToggle}
        role='button'
        tabIndex={-1}
        tooltip='Blockquote'
        type='button'
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon className='tiptap-button-icon' />
            {text && <span className='tiptap-button-text'>{text}</span>}
            {showShortcut && <BlockquoteShortcutBadge shortcutKeys={shortcutKeys} />}
          </>
        )}
      </Button>
    );
  }
);

BlockquoteButton.displayName = 'BlockquoteButton';

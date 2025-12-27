'use client';

import * as React from 'react';

import { Badge } from '../../../components/common/badge';
// --- UI Primitives ---
import type { ButtonProps } from '../../../components/common/button';
import { Button } from '../../../components/common/button';
// --- Tiptap UI ---@/lib/utils/tiptap-utils
import type { UseCodeBlockConfig } from '../../../components/ui/code-block-button/index';
import {
  CODE_BLOCK_SHORTCUT_KEY,
  useCodeBlock
} from '../../../components/ui/code-block-button/index';
// --- Hooks ---
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor';
// --- Lib ---
import { parseShortcutKeys } from '../../../lib/utils';

export interface CodeBlockButtonProps extends Omit<ButtonProps, 'type'>, UseCodeBlockConfig {
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

export function CodeBlockShortcutBadge({
  shortcutKeys = CODE_BLOCK_SHORTCUT_KEY
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for toggling code block in a Tiptap editor.
 *
 * For custom button implementations, use the `useCodeBlock` hook instead.
 */
export const CodeBlockButton = React.forwardRef<HTMLButtonElement, CodeBlockButtonProps>(
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
      useCodeBlock({
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
        tooltip='Code Block'
        type='button'
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon className='tiptap-button-icon' />
            {text && <span className='tiptap-button-text'>{text}</span>}
            {showShortcut && <CodeBlockShortcutBadge shortcutKeys={shortcutKeys} />}
          </>
        )}
      </Button>
    );
  }
);

CodeBlockButton.displayName = 'CodeBlockButton';

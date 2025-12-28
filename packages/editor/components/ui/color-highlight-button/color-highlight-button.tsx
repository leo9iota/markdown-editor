'use client';

import * as React from 'react';

import { Badge } from '../../../components/common/badge';
// --- UI Primitives ---
import type { ButtonProps } from '../../../components/common/button';
import { Button } from '../../../components/common/button';
// --- Tiptap UI ---
import type { UseColorHighlightConfig } from '../../../components/ui/color-highlight-button/index';
import {
  COLOR_HIGHLIGHT_SHORTCUT_KEY,
  useColorHighlight
} from '../../../components/ui/color-highlight-button/index';
// --- Hooks ---
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor';
// --- Lib ---
import { parseShortcutKeys } from '../../../lib/utils';

// --- Styles ---
import './color-highlight-button.scss';

export interface ColorHighlightButtonProps
  extends Omit<ButtonProps, 'type'>, Omit<UseColorHighlightConfig, 'highlightColor'> {
  /**
   * The color to use for highlighting
   */
  highlightColor: string;
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

export function ColorHighlightShortcutBadge({
  shortcutKeys = COLOR_HIGHLIGHT_SHORTCUT_KEY
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for applying color highlights in a Tiptap editor.
 *
 * For custom button implementations, use the `useColorHighlight` hook instead.
 */
export const ColorHighlightButton = React.forwardRef<HTMLButtonElement, ColorHighlightButtonProps>(
  (
    {
      editor: providedEditor,
      highlightColor,
      text,
      hideWhenUnavailable = false,
      onApplied,
      showShortcut = false,
      onClick,
      children,
      style,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canColorHighlight, isActive, handleColorHighlight, label, shortcutKeys } =
      useColorHighlight({
        editor,
        highlightColor,
        label: text || `Toggle highlight (${highlightColor})`,
        hideWhenUnavailable,
        ...(onApplied !== undefined && { onApplied })
      });

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleColorHighlight();
      },
      [handleColorHighlight, onClick]
    );

    const buttonStyle = React.useMemo(
      () =>
        ({
          ...style,
          '--highlight-color': highlightColor
        }) as React.CSSProperties,
      [highlightColor, style]
    );

    if (!isVisible) {
      return null;
    }

    return (
      <Button
        aria-label={label}
        aria-pressed={isActive}
        data-active-state={isActive ? 'on' : 'off'}
        data-disabled={!canColorHighlight}
        data-style='ghost'
        disabled={!canColorHighlight}
        role='button'
        style={buttonStyle}
        tabIndex={-1}
        tooltip={label}
        type='button'
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <span
              className='tiptap-button-highlight'
              style={{ '--highlight-color': highlightColor } as React.CSSProperties}
            />
            {text && <span className='tiptap-button-text'>{text}</span>}
            {showShortcut && <ColorHighlightShortcutBadge shortcutKeys={shortcutKeys} />}
          </>
        )}
      </Button>
    );
  }
);

ColorHighlightButton.displayName = 'ColorHighlightButton';

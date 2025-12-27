'use client';

import * as React from 'react';

import { Badge } from '../../../components/common/badge';
// --- UI Primitives ---@/lib/utils/tiptap-utils
import type { ButtonProps } from '../../../components/common/button';
import { Button } from '../../../components/common/button';
// --- Tiptap UI ---
import type { UseImageUploadConfig } from '../../../components/ui/image-upload-button/index';
import {
  IMAGE_UPLOAD_SHORTCUT_KEY,
  useImageUpload
} from '../../../components/ui/image-upload-button/index';
// --- Hooks ---
import { useTiptapEditor } from '../../../hooks/use-tiptap-editor';
// --- Lib ---
import { parseShortcutKeys } from '../../../lib/utils';

export interface ImageUploadButtonProps extends Omit<ButtonProps, 'type'>, UseImageUploadConfig {
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

export function ImageShortcutBadge({
  shortcutKeys = IMAGE_UPLOAD_SHORTCUT_KEY
}: {
  shortcutKeys?: string;
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>;
}

/**
 * Button component for uploading/inserting images in a Tiptap editor.
 *
 * For custom button implementations, use the `useImage` hook instead.
 */
export const ImageUploadButton = React.forwardRef<HTMLButtonElement, ImageUploadButtonProps>(
  (
    {
      editor: providedEditor,
      text,
      hideWhenUnavailable = false,
      onInserted,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor);
    const { isVisible, canInsert, handleImage, label, isActive, shortcutKeys, Icon } =
      useImageUpload({
        editor,
        hideWhenUnavailable,
        ...(onInserted !== undefined && { onInserted })
      });

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        handleImage();
      },
      [handleImage, onClick]
    );

    if (!isVisible) {
      return null;
    }

    return (
      <Button
        aria-label={label}
        aria-pressed={isActive}
        data-active-state={isActive ? 'on' : 'off'}
        data-disabled={!canInsert}
        data-style='ghost'
        disabled={!canInsert}
        role='button'
        tabIndex={-1}
        tooltip={label}
        type='button'
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon className='tiptap-button-icon' />
            {text && <span className='tiptap-button-text'>{text}</span>}
            {showShortcut && <ImageShortcutBadge shortcutKeys={shortcutKeys} />}
          </>
        )}
      </Button>
    );
  }
);

ImageUploadButton.displayName = 'ImageUploadButton';

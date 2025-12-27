'use client';

import type { ButtonHTMLAttributes, ComponentProps, FC, ReactNode } from 'react';

// Tiptap UI primitives
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../components/common/tooltip';
// Lib
import { cn } from '../../../lib/cn';
import { parseShortcutKeys } from '../../../lib/utils';

import '@/components/editor/components/common/button/button-colors.scss';
import '@/components/editor/components/common/button/button-group.scss';
import '@/components/editor/components/common/button/button.scss';

import { forwardRef, Fragment, useMemo } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  showTooltip?: boolean;
  tooltip?: ReactNode;
  shortcutKeys?: string;
}

export const ShortcutDisplay: FC<{ shortcuts: string[] }> = ({ shortcuts }) => {
  if (shortcuts.length === 0) return null;

  return (
    <div>
      {shortcuts.map((key, index) => (
        <Fragment key={index}>
          {index > 0 && <kbd>+</kbd>}
          <kbd>{key}</kbd>
        </Fragment>
      ))}
    </div>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      tooltip,
      showTooltip = true,
      shortcutKeys,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const shortcuts = useMemo(() => parseShortcutKeys({ shortcutKeys }), [shortcutKeys]);

    if (!tooltip || !showTooltip) {
      return (
        <button
          ref={ref}
          aria-label={ariaLabel}
          className={cn('tiptap-button', className)}
          {...props}
        >
          {children}
        </button>
      );
    }

    return (
      <Tooltip delay={200}>
        <TooltipTrigger
          ref={ref}
          aria-label={ariaLabel}
          className={cn('tiptap-button', className)}
          {...props}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {tooltip}
          <ShortcutDisplay shortcuts={shortcuts} />
        </TooltipContent>
      </Tooltip>
    );
  }
);

Button.displayName = 'Button';

export const ButtonGroup = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & {
    orientation?: 'horizontal' | 'vertical';
  }
>(({ className, children, orientation = 'vertical', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('tiptap-button-group', className)}
      data-orientation={orientation}
      role='group'
      {...props}
    >
      {children}
    </div>
  );
});
ButtonGroup.displayName = 'ButtonGroup';

export default Button;

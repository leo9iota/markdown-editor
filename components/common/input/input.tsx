'use client';

import * as React from 'react';

import { cn } from '../../../lib/cn';

import '@/components/editor/components/common/input/input.scss';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input className={cn('tiptap-input', className)} type={type} {...props} />;
}

function InputGroup({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('tiptap-input-group', className)} {...props}>
      {children}
    </div>
  );
}

export { Input, InputGroup };

# Markdown Editor

Markdown editor designed to be dropped into any Shadcn UI project.

## Installation

1. Copy this entire `editor/` folder into your project's components directory (e.g., `src/components/editor`).
2. Install the required dependencies:

```bash
bun add @tiptap/react @tiptap/pm @tiptap/starter-kit \
@tiptap/extension-highlight @tiptap/extension-image @tiptap/extension-link \
@tiptap/extension-list @tiptap/extension-subscript @tiptap/extension-superscript \
@tiptap/extension-text-align @tiptap/extension-typography \
@radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-separator \
@radix-ui/react-slot @radix-ui/react-toggle @radix-ui/react-tooltip \
lucide-react class-variance-authority clsx tailwind-merge
```

## Usage

```tsx
import { useState } from 'react';

import { MarkdownEditor } from '@/components/editor/markdown-editor';

export default function MyPage() {
    const [content, setContent] = useState('');

    return (
        <div className='mx-auto max-w-4xl p-4'>
            <MarkdownEditor value={content} onChange={setContent} placeholder='Start writing...' />
        </div>
    );
}
```

## Styling

The editor uses Tailwind CSS and some custom SCSS. Ensure you have `sass` installed if your project doesn't already support SCSS imports, or standard Tailwind configuration.

## Customization

- **Extensions**: Add or remove Tiptap extensions in `markdown-editor.tsx`.
- **Toolbar**: Customize the toolbar in `markdown-editor-toolbar.tsx`.
- **Utils**: Internal utilities are located in `./lib`.

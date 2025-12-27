# Markdown Editor Monorepo

A modular, production-ready markdown editor built with Tiptap and React. Designed to be easily integrated into any project via a Shadcn-style CLI installer.

## Packages

This monorepo contains:

- **`@leo9iota/markdown-editor`** - The core markdown editor component
- **`@leo9iota/markdown-editor-cli`** - CLI tool to install the editor into your project
- **`@repo/eslint`** - Shared ESLint configuration for the monorepo
- **`web`** - Documentation and demo site (Next.js 16 with App Router)

## Quick Start

### For Users

Install the markdown editor into your project using the CLI:

```bash
npx @leo9iota/markdown-editor-cli add
```

The CLI will:

- Copy the editor source code into your project
- Detect your package manager (pnpm, npm, yarn, or bun)
- Install required dependencies
- Provide usage instructions

### For Contributors

```bash
# Clone the repository
git clone https://github.com/leo9iota/markdown-editor.git
cd markdown-editor

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run linting
pnpm lint

# Format code
pnpm format

# Build all packages
pnpm build
```

### Project Structure

```
markdown-editor/
├── apps/
│   └── web/              # Next.js documentation site
├── packages/
│   ├── cli/              # CLI installer
│   ├── editor/           # Core markdown editor
│   └── eslint/           # Shared ESLint configs
├── package.json          # Root package
├── pnpm-workspace.yaml   # Workspace configuration
└── turbo.json            # Turborepo configuration
```

### Available Scripts

- `pnpm dev`: Start all packages in development mode
- `pnpm build`: Build all packages
- `pnpm lint`: Lint all packages
- `pnpm format`: Format all code with Prettier

## Features

- **Rich Text Editing**: Bold, italic, underline, strikethrough, code
- **Headings**: H1 through H6
- **Lists**: Ordered, unordered, and task lists
- **Links & Images**: Easy insertion and management
- **Code Blocks**: Syntax highlighting support
- **Text Alignment**: Left, center, right, justify
- **Subscript & Superscript**: For mathematical and scientific notation
- **Color & Highlighting**: Text color and background highlighting
- **Undo/Redo**: Full history support
- **Responsive**: Works on desktop and mobile

## Customization

The editor is built with Tailwind CSS and can be easily customized:

- **Extensions**: Modify Tiptap extensions in `markdown-editor.tsx`
- **Toolbar**: Customize toolbar buttons in `markdown-editor-toolbar.tsx`
- **Styling**: Update Tailwind classes or SCSS files
- **Themes**: Supports light and dark modes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

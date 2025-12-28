import fs from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';
import { execa } from 'execa';
import ora from 'ora';
import prompts from 'prompts';
import tiged from 'tiged';

import { getInstallCommand, getPackageManager } from '../utils/package-manager';

const REPO_URL = 'leo9iota/markdown-editor#master';

// List of required dependencies for the editor
const DEPENDENCIES = [
    '@tiptap/react',
    '@tiptap/starter-kit',
    '@tiptap/extension-placeholder',
    '@tiptap/extension-link',
    '@tiptap/extension-image',
    '@tiptap/extension-task-list',
    '@tiptap/extension-task-item',
    '@tiptap/extension-underline',
    '@tiptap/extension-text-align',
    '@tiptap/extension-subscript',
    '@tiptap/extension-superscript',
    '@tiptap/extension-highlight',
    '@tiptap/extension-color',
    '@tiptap/extension-text-style',
    'lucide-react',
    'clsx',
    'tailwind-merge',
    're-resizable',
    'react-colorful'
];

interface InitOptions {
    path?: string;
    overwrite: boolean;
    deps: boolean;
}

export async function init(options: InitOptions) {
    console.log(chalk.bold.cyan('\nMarkdown Editor Installer\n'));

    // 1. Configuration
    let installPath = options.path;

    if (!installPath) {
        const response = await prompts({
            type: 'text',
            name: 'path',
            message: 'Where would you like to install the component?',
            initial: 'components/markdown-editor'
        });
        installPath = response.path;
    }

    if (!installPath) {
        console.log(chalk.yellow('Operation cancelled.'));
        process.exit(0);
    }

    const targetDir = path.resolve(process.cwd(), installPath);

    // 2. Check overlap
    if (fs.existsSync(targetDir) && !options.overwrite) {
        const response = await prompts({
            type: 'confirm',
            name: 'overwrite',
            message: `Directory ${chalk.bold(installPath)} already exists. Overwrite?`,
            initial: false
        });
        if (!response.overwrite) {
            console.log(chalk.yellow('Skipping installation.'));
            process.exit(0);
        }
    }

    // 3. Fetch Source Code
    const spinner = ora('Fetching latest version from GitHub...').start();

    // We fetch into a temp dir first, because `tiged` fetches the whole repo.
    // We only want specific files.
    const tempDir = path.resolve(process.cwd(), '.markdown-editor-temp');

    try {
        const emitter = tiged(REPO_URL, {
            disableCache: true,
            force: true
        });

        await emitter.clone(tempDir);
        spinner.succeed('Downloaded source code.');
    } catch (error) {
        spinner.fail('Failed to fetch repository.');
        console.error(error);
        process.exit(1);
    }

    // 4. Extract & Move Files
    spinner.start('Installing component files...');

    try {
        // Defines what to copy
        // We assume the repo structure is flat-ish based on your previous modularization

        // We want to move contents of tempDir/packages/editor/components -> targetDir/components
        // tempDir/packages/editor/hooks -> targetDir/hooks
        // tempDir/packages/editor/lib -> targetDir/lib
        // tempDir/packages/editor/styles -> targetDir/styles
        // tempDir/packages/editor/*.tsx -> targetDir/

        // Helper to copy recursive
        const copyRecursive = (src: string, dest: string) => {
            if (!fs.existsSync(src)) return;
            const stats = fs.statSync(src);
            if (stats.isDirectory()) {
                if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
                fs.readdirSync(src).forEach(child => {
                    copyRecursive(path.join(src, child), path.join(dest, child));
                });
            } else {
                // Ensure parent dir exists
                const parent = path.dirname(dest);
                if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
                fs.copyFileSync(src, dest);
            }
        };

        const editorSourceDir = path.join(tempDir, 'packages', 'editor');

        // Copy specific items
        copyRecursive(path.join(editorSourceDir, 'components'), path.join(targetDir, 'components'));
        copyRecursive(path.join(editorSourceDir, 'hooks'), path.join(targetDir, 'hooks'));
        copyRecursive(path.join(editorSourceDir, 'lib'), path.join(targetDir, 'lib'));
        copyRecursive(path.join(editorSourceDir, 'styles'), path.join(targetDir, 'styles'));

        // Copy root .tsx files
        if (fs.existsSync(editorSourceDir)) {
            const files = fs.readdirSync(editorSourceDir);
            for (const file of files) {
                if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                    if (file === 'markdown-editor.tsx' || file === 'markdown-editor-toolbar.tsx') {
                        fs.copyFileSync(
                            path.join(editorSourceDir, file),
                            path.join(targetDir, file)
                        );
                    }
                }
            }
        } else {
            // Fallback for older repo structure if packages/editor doesn't exist yet (during transition)
            // Or handle error
            throw new Error(`Could not find editor source package in ${editorSourceDir}.`);
        }

        spinner.succeed(`Installed files to ${chalk.green(installPath)}`);
    } catch (err) {
        spinner.fail('Failed to copy files.');
        console.error(err);
        process.exit(1);
    } finally {
        // Cleanup temp
        fs.rmSync(tempDir, { recursive: true, force: true });
    }

    // 5. Install Dependencies
    if (options.deps !== false) {
        const pm = getPackageManager();
        spinner.start(`Installing dependencies with ${pm}...`);

        try {
            const args = getInstallCommand(pm, DEPENDENCIES);
            await execa(pm, args);
            spinner.succeed('Dependencies installed.');
        } catch (err) {
            spinner.fail('Failed to install dependencies.');
            console.log(
                chalk.yellow(`Please run: ${pm} ${getInstallCommand(pm, DEPENDENCIES).join(' ')}`)
            );
        }
    }

    // 6. Final Instructions
    console.log(chalk.bold.green('\n✨ Installation Complete!'));
    console.log(`\nNext steps:`);
    console.log(
        `1. Make sure your ${chalk.cyan('tailwind.config.ts/js')} includes the new content path:`
    );
    console.log(
        chalk.gray(`   content: [\n     "./${installPath}/**/*.{ts,tsx}",\n     ...\n   ]`)
    );
    console.log(`2. Import and use the editor:`);
    console.log(
        chalk.gray(`   import { MarkdownEditor } from '@/${installPath}/markdown-editor';`)
    );
    console.log('\nHappy coding! 🚀');
}

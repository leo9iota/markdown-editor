#!/usr/bin/env node
import { Command } from 'commander';
import { add } from './commands/add';

const program = new Command();

program
    .name('markdown-editor-cli')
    .description('CLI to install the Modular Markdown Editor')
    .version('0.1.0');

program
    .command('add')
    .description('Add the markdown editor component to your project')
    .option('-p, --path <path>', 'Installation path (default: components/markdown-editor)')
    .option('-o, --overwrite', 'Overwrite existing files', false)
    .option('--no-deps', 'Skip dependency installation')
    .action(add);

program.parse();

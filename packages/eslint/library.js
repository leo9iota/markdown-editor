const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ['./base.js', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project,
    },
    plugins: ['@typescript-eslint'],
    env: {
        node: true,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: ['.*.js', 'node_modules/', 'dist/'],
    overrides: [
        {
            files: ['*.js?(x)', '*.ts?(x)'],
        },
    ],
};

import js from '@eslint/js';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['.*.js', 'node_modules/', 'dist/']
    },
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                React: 'readonly',
                JSX: 'readonly'
            }
        }
    }
];

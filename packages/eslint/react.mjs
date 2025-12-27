import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

import baseConfig from './base.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...baseConfig,
    {
        files: ['**/*.jsx', '**/*.tsx'],
        languageOptions: {
            globals: {
                ...globals.browser
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            react,
            'react-hooks': reactHooks
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules
        },
        settings: {
            react: {
                version: 'detect'
            }
        }
    }
];

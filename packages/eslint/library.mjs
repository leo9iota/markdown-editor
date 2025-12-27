import tseslint from 'typescript-eslint';

import baseConfig from './base.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...baseConfig,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parserOptions: {
                projectService: true
            }
        }
    }
];

const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ['./base.js', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
    parserOptions: {
        project,
    },
    globals: {
        React: true,
        JSX: true,
    },
    env: {
        browser: true,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
        react: {
            version: 'detect',
        },
    },
    overrides: [
        {
            files: ['*.js?(x)', '*.ts?(x)'],
        },
    ],
};

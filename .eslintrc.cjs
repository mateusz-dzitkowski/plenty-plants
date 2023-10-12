/* eslint-env bun */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        project: true
    },
    root: true,
};

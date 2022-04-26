/*
 *  ESLint run control for alpa project.
 *  Created On 26 April 2022
 */

module.exports = {
    plugins: ['prettier', 'simple-import-sort', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    env: {
        es2021: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        'import/extensions': ['.js'],
        react: {
            version: '17',
        },
    },
    ignorePatterns: ['**/dist'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            plugins: [
                'prettier',
                'simple-import-sort',
                '@typescript-eslint',
                'import',
            ],
            extends: [
                'eslint:recommended',
                'plugin:prettier/recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:react/recommended',
                'plugin:react/jsx-runtime',
            ],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
    ],
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['off', 'single'],
        semi: ['error', 'never'],
        'prettier/prettier': 'error',
        'simple-import-sort/imports': 'error',
        'sort-imports': 'off',
        'import/order': 'off',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
    },
}

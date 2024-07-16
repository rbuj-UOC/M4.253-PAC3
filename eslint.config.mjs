import globals from 'globals';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      indent: ['error', 2],
      'prefer-const': 'error',
      semi: 'error'
    }
  },
  js.configs.recommended,
  react.configs.recommended,
  eslintConfigPrettier
];

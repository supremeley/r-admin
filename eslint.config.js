import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = fs.readFileSync('./.eslintrc-auto-import.json', 'utf-8');
const eslintrcAutoImportGlobals = JSON.parse(data.toString());

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends('plugin:react-hooks/recommended'),
  ...compat.extends('plugin:prettier/recommended'),
  ...compat.extends('plugin:import/typescript'),
  ...compat.config({
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      project: ['./tsconfig.json', './tsconfig.node.json'],
      tsconfigRootDir: __dirname,
    },
    extends: ['plugin:@typescript-eslint/recommended-type-checked', 'plugin:@typescript-eslint/stylistic-type-checked'],
    ignorePatterns: ['dist', 'eslint.config.js'],
  }),
  ...compat.config({
    settings: {
      react: { version: 'detect' },
    },
    extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime'],
  }),
  ...compat.plugins(
    'eslint-plugin-react-refresh',
    'eslint-plugin-prettier',
    'eslint-plugin-import',
    'eslint-plugin-simple-import-sort',
  ),
  {
    ignores: ['*.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...eslintrcAutoImportGlobals.globals,
      },
    },
    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
    },
  },
];

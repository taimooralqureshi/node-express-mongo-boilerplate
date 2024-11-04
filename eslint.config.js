import globals from 'globals';
import JsPlugin from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globals.node } } },
  JsPlugin.configs.recommended,
  prettierConfig,
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    plugins: {
      prettier: prettierPlugin,
      js: JsPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];

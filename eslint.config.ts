import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'curly': ['error', 'all'],
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'src/data.ts'],
  },
]);

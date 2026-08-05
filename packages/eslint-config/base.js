/**
 * Shared ESLint flat-config / legacy-config baseline for non-RN packages.
 * Mobile uses ./react-native.js.
 */
module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.turbo/**'],
};

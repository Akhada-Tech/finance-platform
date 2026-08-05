/**
 * React Native ESLint composition used by apps/mobile.
 * Relies on `@react-native/eslint-config` installed in the consumer.
 */
module.exports = {
  extends: ['@react-native'],
  overrides: [
    {
      files: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx', 'jest.setup.js'],
      env: {
        jest: true,
      },
    },
  ],
};

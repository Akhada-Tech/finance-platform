module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: [
    'react-native-gesture-handler/jestSetup',
    'react-native-unistyles/mocks',
    '<rootDir>/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-gesture-handler|react-native-screens|react-native-unistyles|react-native-nitro-modules)/)',
  ],
};

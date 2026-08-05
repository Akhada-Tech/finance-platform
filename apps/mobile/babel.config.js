const path = require('path');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        // Absolute paths — relative './src' breaks for files nested under src/.
        root: [path.resolve(__dirname)],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
    ],
    [
      'react-native-unistyles/plugin',
      {
        // Process app source; App.tsx stays thin and outside this tree.
        root: 'src',
      },
    ],
  ],
};

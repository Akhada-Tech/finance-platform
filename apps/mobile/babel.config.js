module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'react-native-unistyles/plugin',
      {
        // Process app source; App.tsx stays thin and outside this tree.
        root: 'src',
      },
    ],
  ],
};

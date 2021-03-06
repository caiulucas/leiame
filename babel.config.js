module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: 'react-native-dotenv',
        },
      ],
      [
        'module-resolver',
        {
          root: ['src'],
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@hooks': './src/hooks',
            '@routes': './src/routes',
            '@screens': './src/screens',
            '@services': './src/services',
            '@utils': './src/utils',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

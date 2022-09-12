module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          root: __dirname,
          rootPathPrefix: '~',
          rootPathSuffix: './src',
        },
      ],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@navigation': './src/navigation',
            '@interfaces': './src/interfaces',
            '@screens': './src/screens',
            '@config': './src/config',
            '@context': './src/context',
            '@constants': './src/constants',
            '@components': './src/layout',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};

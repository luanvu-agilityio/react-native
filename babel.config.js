module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    'transform-inline-environment-variables',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@features': './src/features',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@app-types': './src/types',
          '@constants': './src/constants',
          '@assets': './src/assets',
          '@icons': './src/icons',
          '@lib': './src/lib',
          '@services': './src/services',
        },
      },
    ],
  ],
};

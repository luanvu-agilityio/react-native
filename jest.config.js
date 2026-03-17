module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-bootsplash|react-native-gesture-handler|react-native-reanimated|react-native-css-interop|nativewind|react-native-toast-message|react-native-svg|react-native-worklets|@gorhom|lucide-react-native|class-variance-authority|clsx|tailwind-merge|@tanstack|@react-native-community|@react-native-async-storage)/)',
  ],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['react-native-gesture-handler/jestSetup'],
};

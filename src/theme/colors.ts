const colors = {
  // Brand
  primary: '#391713',
  secondary: '#E95322',
  'light-red': '#FF642F',
  yellow: '#F5CB58',
  cream: '#F3E9B5',
  peach: '#FFDECF',
  dark: '#252525',

  // Grays
  'gray-icon': '#676767',
  'gray-light': '#F5F5F5',
  'gray-bg': '#F8F8F8',

  // Base
  white: '#ffffff',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof colors;

export default colors;

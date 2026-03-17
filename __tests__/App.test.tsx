/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-bootsplash', () => ({
  __esModule: true,
  default: {
    hide: jest.fn(() => Promise.resolve()),
    getVisibilityStatus: jest.fn(() => Promise.resolve('hidden')),
  },
}));

jest.mock('../src/navigation/RootNavigator', () => ({
  __esModule: true,
  default: () => null,
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

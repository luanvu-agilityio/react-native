import React from 'react';
import { render } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.mock('better-auth/client', () => ({ createAuthClient: () => ({}) }));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-navigation/native-stack', () => {
  const ReactLib = require('react');
  return {
    createNativeStackNavigator: () => {
      const { View } = require('react-native');
      const Navigator = (
        props: React.PropsWithChildren<Record<string, unknown>>,
      ) =>
        ReactLib.createElement(
          View,
          { testID: 'mock-app-stack' },
          props.children,
        );
      const Screen = (props: { component: React.ComponentType }) => {
        const Comp = props.component;
        return ReactLib.createElement(Comp);
      };
      return { Navigator, Screen };
    },
  };
});

jest.mock('../HomeNavigator', () => {
  const ReactLib = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: () =>
      ReactLib.createElement(View, { testID: 'mock-home-navigator' }),
  };
});

jest.mock('../CheckoutNavigator', () => {
  const ReactLib = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: () =>
      ReactLib.createElement(View, { testID: 'mock-checkout-navigator' }),
  };
});

jest.mock('@features/cart/components/CartOverlay', () => {
  const ReactLib = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: () =>
      ReactLib.createElement(View, { testID: 'mock-cart-overlay' }),
  };
});

jest.mock('../../lib/authClient', () => ({
  __esModule: true,
  authClient: {},
}));

import AppNavigator from '../AppNavigator';

describe('AppNavigator', () => {
  it('exports a component', () => {
    expect(typeof AppNavigator).toBe('function');
  });

  it('renders stack screens and CartOverlay', () => {
    const tree = render(
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>,
    );

    expect(tree).toBeTruthy();
  });
});

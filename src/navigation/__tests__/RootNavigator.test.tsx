import React from 'react';
import { render } from '@testing-library/react-native';
import BootSplash from 'react-native-bootsplash';

jest.mock('react-native-bootsplash', () => ({ hide: jest.fn() }));

jest.mock('@react-navigation/native', () => {
  const ReactLocal = require('react');
  const { View } = require('react-native');
  return {
    NavigationContainer: (
      props: React.PropsWithChildren<Record<string, unknown>>,
    ) => {
      const { children, onReady } = props as unknown as {
        children?: React.ReactNode;
        onReady?: () => void;
      };
      ReactLocal.useEffect(() => {
        if (onReady) onReady();
      }, [onReady]);
      return ReactLocal.createElement(
        View,
        { testID: 'mock-nav-container' },
        children,
      );
    },
  };
});

jest.mock('@react-navigation/native-stack', () => {
  const ReactLocal = require('react');
  return {
    createNativeStackNavigator: () => {
      const { View } = require('react-native');
      const Navigator = (
        props: React.PropsWithChildren<Record<string, unknown>>,
      ) =>
        ReactLocal.createElement(
          View,
          { testID: 'mock-root-stack' },
          props.children,
        );
      const Screen = (props: { component: React.ComponentType }) => {
        const Comp = props.component;
        return ReactLocal.createElement(Comp);
      };
      return { Navigator, Screen };
    },
  };
});

jest.mock('../AppNavigator', () => {
  const ReactLib = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: () =>
      ReactLib.createElement(View, { testID: 'mock-app-navigator' }),
  };
});

jest.mock('../AuthNavigator', () => {
  const ReactLib = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: () =>
      ReactLib.createElement(View, { testID: 'mock-auth-navigator' }),
  };
});

interface AuthState {
  _hasHydrated: boolean;
  isAuthenticated: boolean;
}

let authState: AuthState = { _hasHydrated: true, isAuthenticated: false };
jest.mock('@store/authStore', () => ({
  useAuthStore: (selector: (s: AuthState) => unknown) => selector(authState),
}));

jest.mock('@lib/navigationRef', () => ({
  navigationRef: { isReady: () => true, current: null },
  navigateTo: jest.fn(),
}));

import RootNavigator from '../RootNavigator';

describe('RootNavigator', () => {
  it('exports a component', () => {
    expect(typeof RootNavigator).toBe('function');
  });

  it('renders AppNavigator when authenticated', () => {
    authState.isAuthenticated = true;
    const { getByTestId } = render(<RootNavigator />);
    expect(getByTestId('mock-app-navigator')).toBeTruthy();
  });

  it('renders AuthNavigator when not authenticated', () => {
    authState.isAuthenticated = false;
    const { getByTestId } = render(<RootNavigator />);
    expect(getByTestId('mock-auth-navigator')).toBeTruthy();
  });

  it('calls BootSplash.hide when navigation is ready', () => {
    authState.isAuthenticated = false;
    render(<RootNavigator />);
    expect(BootSplash.hide).toHaveBeenCalledWith({ fade: true });
  });
});

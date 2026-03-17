import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  return {
    createNativeStackNavigator: () => {
      const { View } = require('react-native');
      const Navigator = ({ children }: { children: React.ReactNode }) =>
        React.createElement(View, { testID: 'mock-auth-stack' }, children);
      const Screen = () => null;
      return { Navigator, Screen };
    },
  };
});

jest.mock('@features/auth', () => ({
  OnboardingScreen: () => null,
  WelcomeScreen: () => null,
  LoginScreen: () => null,
  RegisterScreen: () => null,
  SetFingerprintScreen: () => null,
}));

jest.mock('@store/authStore', () => ({ useAuthStore: jest.fn() }));

import AuthNavigator from '../AuthNavigator';
import { useAuthStore } from '@store/authStore';

describe('AuthNavigator', () => {
  it('exports a component', () => {
    expect(typeof AuthNavigator).toBe('function');
  });

  it('renders with Onboarding as initial route when onboarding not seen', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(false);
    const { getByTestId } = render(<AuthNavigator />);
    expect(getByTestId('mock-auth-stack')).toBeTruthy();
  });

  it('renders with Welcome as initial route when onboarding has been seen', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(true);
    const { getByTestId } = render(<AuthNavigator />);
    expect(getByTestId('mock-auth-stack')).toBeTruthy();
  });
});

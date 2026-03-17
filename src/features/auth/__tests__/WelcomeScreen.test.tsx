import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

jest.mock('../components/BrandLogo', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@components/Typography', () => {
  const _React = require('react') as typeof import('react');
  const RN = require('react-native') as typeof import('react-native');
  return {
    __esModule: true,
    default: ({ children }: { children?: React.ReactNode }) =>
      _React.createElement(RN.Text, null, children),
  };
});

jest.mock('@components/Button', () => {
  const _React = require('react') as typeof import('react');
  const RN = require('react-native') as typeof import('react-native');
  return {
    __esModule: true,
    default: ({ label, onPress }: { label: string; onPress?: () => void }) =>
      _React.createElement(
        RN.Pressable,
        { onPress, accessibilityLabel: label },
        _React.createElement(RN.Text, null, label),
      ),
  };
});

import WelcomeScreen from '../screens/WelcomeScreen';
import type { AuthScreenProps } from '@app-types/navigation';

describe('WelcomeScreen', () => {
  it('navigates to Login and Register when buttons pressed', async () => {
    const navigation = {
      navigate: jest.fn(),
    } as unknown as AuthScreenProps<'Welcome'>['navigation'];

    const { getByLabelText } = render(
      <WelcomeScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'Welcome'>['route']}
      />,
    );

    // WelcomeScreen renders "Log In" and "Sign Up" buttons
    fireEvent.press(getByLabelText('Log In'));
    await waitFor(() =>
      expect(navigation.navigate).toHaveBeenCalledWith('Login'),
    );

    fireEvent.press(getByLabelText('Sign Up'));
    await waitFor(() =>
      expect(navigation.navigate).toHaveBeenCalledWith('Register'),
    );
  });
});

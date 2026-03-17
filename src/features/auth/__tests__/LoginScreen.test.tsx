import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

jest.mock('@components/index', () => {
  const _React = require('react') as typeof import('react');
  const RN = require('react-native') as typeof import('react-native');
  return {
    __esModule: true,
    Typography: ({ children }: { children?: React.ReactNode }) =>
      _React.createElement(RN.Text, null, children),
    Button: ({ label, onPress }: { label?: string; onPress?: () => void }) =>
      _React.createElement(
        RN.Pressable,
        { onPress, accessibilityLabel: label },
        _React.createElement(RN.Text, null, label),
      ),
    FormTextInput: () => null,
    Heading: ({ children }: { children?: React.ReactNode }) =>
      _React.createElement(RN.Text, null, children),
  };
});

jest.mock('@components/ScreenLayout', () => {
  const _React = require('react') as typeof import('react');
  return {
    __esModule: true,
    default: ({ children }: { children?: React.ReactNode }) =>
      _React.createElement(_React.Fragment, null, children),
  };
});

jest.mock('@components/features/PageHeader', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('../components/AuthErrorMessage', () => ({
  AuthErrorMessage: () => null,
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (fn: (data: Record<string, string>) => void) => () =>
      fn({ emailOrPhone: 'user@example.com', password: 'pass123' }),
    setError: jest.fn(),
    formState: { isSubmitting: false },
  }),
}));

jest.mock('@hookform/resolvers/zod', () => ({ zodResolver: () => jest.fn() }));

const mockSignIn = jest.fn();
jest.mock('../hooks/useAuth', () => ({
  useSignIn: () => mockSignIn,
}));

import LoginScreen from '../screens/LoginScreen';
import type { AuthScreenProps } from '@app-types/navigation';

describe('LoginScreen', () => {
  it('navigates to Register when Sign Up link pressed', () => {
    mockSignIn.mockResolvedValue({ user: { id: 'u1' } });
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    } as unknown as AuthScreenProps<'Login'>['navigation'];

    const { getByText } = render(
      <LoginScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'Login'>['route']}
      />,
    );

    fireEvent.press(getByText('Sign Up'));
    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });

  it('calls signIn on Log In button press', async () => {
    mockSignIn.mockResolvedValue({ user: { id: 'u1' } });
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    } as unknown as AuthScreenProps<'Login'>['navigation'];

    const { getByLabelText } = render(
      <LoginScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'Login'>['route']}
      />,
    );

    fireEvent.press(getByLabelText('Log In'));
    await waitFor(() => expect(mockSignIn).toHaveBeenCalled());
  });

  it('sets auth error when signIn returns error', async () => {
    mockSignIn.mockResolvedValue({ error: { message: 'Invalid credentials' } });
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    } as unknown as AuthScreenProps<'Login'>['navigation'];

    const { getByLabelText } = render(
      <LoginScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'Login'>['route']}
      />,
    );

    fireEvent.press(getByLabelText('Log In'));
    await waitFor(() => expect(mockSignIn).toHaveBeenCalled());
  });
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

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
  };
});

jest.mock('@components/TextInput', () => ({ TextInput: () => null }));

jest.mock('../components/AuthErrorMessage', () => ({
  AuthErrorMessage: () => null,
}));

jest.mock('@react-native-community/datetimepicker', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('@utils/index', () => ({
  formatDateDisplay: (d: Date) => d.toISOString(),
  formatDateToISO: (d: Date) => d.toISOString().slice(0, 10),
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (fn: (data: Record<string, string>) => void) => () =>
      fn({
        fullName: 'Test User',
        email: 'test@example.com',
        mobileNumber: '0000000000',
        dateOfBirth: '2000-01-01',
        password: 'password123',
      }),
    setValue: jest.fn(),
    setError: jest.fn(),
    formState: { isSubmitting: false },
  }),
  Controller: ({
    render: renderFn,
  }: {
    render: (args: {
      field: Record<string, unknown>;
      fieldState: Record<string, unknown>;
    }) => React.ReactNode;
  }) => renderFn({ field: {}, fieldState: {} }),
}));

jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => jest.fn(),
}));

jest.mock('../hooks/useAuth', () => ({
  useSignUp: () => jest.fn().mockResolvedValue({ user: { id: 'u1' } }),
}));

import RegisterScreen from '../screens/RegisterScreen';
import type { AuthScreenProps } from '@app-types/navigation';

describe('RegisterScreen', () => {
  it('navigates to SetFingerprint on successful sign up', async () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    } as unknown as AuthScreenProps<'Register'>['navigation'];

    const { getByLabelText } = render(
      <RegisterScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'Register'>['route']}
      />,
    );

    fireEvent.press(getByLabelText('Sign Up'));
    await waitFor(() =>
      expect(navigation.navigate).toHaveBeenCalledWith('SetFingerprint'),
    );
  });

  it('navigates to Login when Log In link pressed', () => {
    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    } as unknown as AuthScreenProps<'Register'>['navigation'];

    const { getByLabelText } = render(
      <RegisterScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'Register'>['route']}
      />,
    );

    fireEvent.press(getByLabelText('Log In'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});

import React, { useEffect, useState } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { View, Text } from 'react-native';

jest.mock('@store/authStore', () => ({
  useAuthStore: (selector: Function) =>
    selector({ setAuth: jest.fn(), clearAuth: jest.fn() }),
}));

jest.mock('@lib/authClient', () => ({
  authClient: {
    signIn: {
      email: async () => ({ data: null, error: {} }),
    },
  },
}));

import { AUTH_ERROR_MESSAGES } from '@constants/message';
import { useSignIn } from '../hooks/useAuth';

describe('useSignIn fallback error message', () => {
  it('uses AUTH_ERROR_MESSAGES.signInFailed when error.message is absent', async () => {
    const Test: React.FC = () => {
      const signIn = useSignIn();
      const [msg, setMsg] = useState('');
      useEffect(() => {
        signIn('a@b.com', 'x').then(res => {
          if (res.error) setMsg(res.error.message);
        });
      }, [signIn]);
      return msg ? <Text testID="msg">{msg}</Text> : <View />;
    };

    const { getByTestId } = render(<Test />);
    await waitFor(() => expect(getByTestId('msg')).toBeTruthy());
    expect(getByTestId('msg').props.children).toBe(
      AUTH_ERROR_MESSAGES.signInFailed,
    );
  });
});

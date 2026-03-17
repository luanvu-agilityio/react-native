import React, { useEffect, useState } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { View, Text } from 'react-native';

jest.mock('@store/authStore', () => ({
  useAuthStore: (selector: Function) =>
    selector({ setAuth: jest.fn(), clearAuth: jest.fn() }),
}));

jest.mock('@lib/authClient', () => ({
  authClient: {
    signUp: {
      email: async () => ({ data: null, error: {} }),
    },
  },
}));

import { AUTH_ERROR_MESSAGES } from '@constants/message';
import { useSignUp } from '../hooks/useAuth';

describe('useSignUp fallback error message', () => {
  it('uses AUTH_ERROR_MESSAGES.registrationFailed when error.message is absent', async () => {
    const Test: React.FC = () => {
      const signUp = useSignUp();
      const [msg, setMsg] = useState('');
      useEffect(() => {
        signUp({ fullName: 'Bob', email: 'b@b.com', password: 'pass' }).then(
          res => {
            if (res.error) setMsg(res.error.message);
          },
        );
      }, [signUp]);
      return msg ? <Text testID="msg">{msg}</Text> : <View />;
    };

    const { getByTestId } = render(<Test />);
    await waitFor(() => expect(getByTestId('msg')).toBeTruthy());
    expect(getByTestId('msg').props.children).toBe(
      AUTH_ERROR_MESSAGES.registrationFailed,
    );
  });
});

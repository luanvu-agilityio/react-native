import React, { useEffect, useState } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { View } from 'react-native';

jest.mock('@store/authStore', () => ({
  useAuthStore: (selector: Function) =>
    selector({ setAuth: jest.fn(), clearAuth: jest.fn() }),
}));

jest.mock('@lib/authClient', () => ({
  authClient: {
    signIn: {
      email: async () => ({
        data: null,
        error: { message: 'Invalid credentials' },
      }),
    },
  },
}));

import { useSignIn } from '../hooks/useAuth';

describe('useSignIn error path', () => {
  it('returns error when sign in fails', async () => {
    const Test: React.FC = () => {
      const signIn = useSignIn();
      const [err, setErr] = useState(false);
      useEffect(() => {
        signIn('a@b.com', 'wrong').then(res => {
          if (res.error) setErr(true);
        });
      }, [signIn]);
      return <>{err ? <View testID="err" /> : null}</>;
    };

    const { getByTestId } = render(<Test />);
    await waitFor(() => expect(getByTestId('err')).toBeTruthy());
  });
});

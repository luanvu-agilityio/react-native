import React, { useEffect, useState } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { View } from 'react-native';

jest.mock('@store/authStore', () => ({
  useAuthStore: (selector: Function) =>
    selector({ setAuth: jest.fn(), clearAuth: jest.fn() }),
}));

jest.mock('@lib/authClient', () => ({
  authClient: {
    signUp: {
      email: async () => ({
        data: { user: { id: 'u2', name: 'Alice' } },
        error: null,
      }),
    },
  },
}));

import { useSignUp } from '../hooks/useAuth';

describe('useSignUp success path', () => {
  it('returns user on successful sign up', async () => {
    const Test: React.FC = () => {
      const signUp = useSignUp();
      const [ok, setOk] = useState(false);
      useEffect(() => {
        signUp({
          fullName: 'Alice',
          email: 'alice@example.com',
          password: 'pass1234',
        }).then(res => {
          if ('user' in res && res.user) setOk(true);
        });
      }, [signUp]);
      return <>{ok ? <View testID="ok" /> : null}</>;
    };

    const { getByTestId } = render(<Test />);
    await waitFor(() => expect(getByTestId('ok')).toBeTruthy());
  });
});

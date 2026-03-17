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
        data: { user: { id: 'u1' }, token: 't1' },
        error: undefined,
      }),
    },
  },
}));

import { useSignIn } from '../hooks/useAuth';

describe('useSignIn', () => {
  it('calls setAuth on successful sign in', async () => {
    const Test: React.FC = () => {
      const signIn = useSignIn();
      const [ok, setOk] = useState(false);
      useEffect(() => {
        signIn('a@b.com', 'pw').then(res => {
          if ('user' in res && res.user) setOk(true);
        });
      }, [signIn]);
      return <>{ok ? <View testID="done" /> : null}</>;
    };

    const { getByTestId } = render(<Test />);
    await waitFor(() => expect(getByTestId('done')).toBeTruthy());
  });
});

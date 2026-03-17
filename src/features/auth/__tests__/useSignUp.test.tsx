import React, { useEffect, useState } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';

jest.mock('@store/authStore', () => ({
  useAuthStore: (selector: Function) =>
    selector({ setAuth: jest.fn(), clearAuth: jest.fn() }),
}));

jest.mock('@lib/authClient', () => ({
  authClient: {
    signUp: { email: async () => ({ data: null, error: { message: 'fail' } }) },
  },
}));

import { useSignUp } from '../hooks/useAuth';

describe('useSignUp', () => {
  it('returns error when signup fails', async () => {
    const Test: React.FC = () => {
      const signUp = useSignUp();
      const [err, setErr] = useState<string | null>(null);
      useEffect(() => {
        signUp({
          fullName: 'A',
          email: 'e@e.com',
          password: 'password',
          phone: undefined,
        }).then(res => {
          if (res.error) setErr(res.error.message);
        });
      }, [signUp]);
      return <>{err ? <Text testID="err">{err}</Text> : null}</>;
    };

    const { getByTestId } = render(<Test />);
    await waitFor(() => expect(getByTestId('err').props.children).toBe('fail'));
  });
});

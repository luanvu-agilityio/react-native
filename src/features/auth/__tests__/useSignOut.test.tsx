import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react-native';

jest.mock('@store/authStore', () => {
  const clear = jest.fn();
  return {
    useAuthStore: (selector: Function) =>
      selector({ setAuth: jest.fn(), clearAuth: clear }),
    __clearAuthMock: clear,
  };
});

jest.mock('@lib/authClient', () => ({
  authClient: { signOut: async () => ({}) },
}));

import { useSignOut } from '../hooks/useAuth';

describe('useSignOut', () => {
  it('calls clearAuth when signing out', async () => {
    const Test: React.FC = () => {
      const signOut = useSignOut();
      useEffect(() => {
        signOut();
      }, [signOut]);
      return null;
    };

    render(<Test />);
    const mod = require('@store/authStore');
    await waitFor(() => expect(mod.__clearAuthMock).toHaveBeenCalled());
  });
});

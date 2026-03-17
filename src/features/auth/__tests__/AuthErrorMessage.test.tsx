import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@components/Toast', () => ({ toast: { error: jest.fn() } }));

jest.mock('@components/index', () => {
  const _React = require('react') as typeof import('react');
  const { Text } = require('react-native') as typeof import('react-native');
  return {
    Typography: ({ children }: { children?: React.ReactNode }) =>
      _React.createElement(Text, { testID: 'typo' }, children),
  };
});

import { AuthErrorMessage } from '../components/AuthErrorMessage';
import { getAuthErrorTitle, type AuthErrorInfo } from '../utils/authError';

describe('AuthErrorMessage', () => {
  afterEach(() => jest.clearAllMocks());

  it('does not render when error is null', () => {
    const { queryByTestId } = render(<AuthErrorMessage error={null} />);
    expect(queryByTestId('typo')).toBeNull();
  });

  it('fires toast when display === "toast"', () => {
    const err: AuthErrorInfo = {
      code: 'NETWORK_ERROR',
      message: 'net fail',
      display: 'toast',
    };
    const { toast } = require('@components/Toast');
    render(<AuthErrorMessage error={err} />);
    expect(toast.error).toHaveBeenCalledWith(
      getAuthErrorTitle(err.code),
      err.message,
    );
  });

  it('renders inline Typography when display === "inline"', () => {
    const err: AuthErrorInfo = {
      code: 'INVALID_CREDENTIALS',
      message: 'bad',
      display: 'inline',
    };
    const { getByTestId } = render(<AuthErrorMessage error={err} />);
    expect(getByTestId('typo').props.children).toBe('bad');
  });
});

import { classifyAuthError, getAuthErrorTitle } from '../utils';
import { AUTH_ERROR_MESSAGES } from '@constants/message';

describe('authError utils', () => {
  it('classifies network errors as NETWORK_ERROR and uses toast', () => {
    const e = classifyAuthError('Network connection timed out');
    expect(e.code).toBe('NETWORK_ERROR');
    expect(e.display).toBe('toast');
    expect(e.message).toBe(AUTH_ERROR_MESSAGES.networkErrorMessage);
  });

  it('classifies credential errors and uses inline display', () => {
    const e = classifyAuthError('Invalid password');
    expect(e.code).toBe('INVALID_CREDENTIALS');
    expect(e.display).toBe('inline');
  });

  it('classifies email-exists errors and uses inline display', () => {
    const e = classifyAuthError('User already exists');
    expect(e.code).toBe('EMAIL_EXISTS');
    expect(e.display).toBe('inline');
  });

  it('classifies unknown errors as UNKNOWN with fallback message', () => {
    const e = classifyAuthError('Some weird error');
    expect(e.code).toBe('UNKNOWN');
    expect(e.display).toBe('toast');
  });

  it('returns friendly title via getAuthErrorTitle', () => {
    expect(getAuthErrorTitle('INVALID_CREDENTIALS')).toBe(
      AUTH_ERROR_MESSAGES.invalidCredentialsTitle,
    );
  });
});

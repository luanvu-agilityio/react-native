import { AUTH_ERROR_MESSAGES } from '@constants/message';

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_EXISTS'
  | 'NETWORK_ERROR'
  | 'UNKNOWN';

export type AuthErrorDisplay = 'inline' | 'toast';

export interface AuthErrorInfo {
  code: AuthErrorCode;
  message: string;
  display: AuthErrorDisplay;
}

const NETWORK_PATTERNS = [
  'connect',
  'network',
  'fetch',
  'timeout',
  'offline',
  'econnrefused',
];

const CREDENTIAL_PATTERNS = [
  'invalid',
  'credential',
  'incorrect',
  'password',
  'not found',
  'no user',
];

const EMAIL_EXISTS_PATTERNS = ['already exists', 'user already'];

const FRIENDLY: Record<AuthErrorCode, { title: string; message: string }> = {
  INVALID_CREDENTIALS: {
    title: AUTH_ERROR_MESSAGES.invalidCredentialsTitle,
    message: AUTH_ERROR_MESSAGES.invalidCredentialsMessage,
  },
  EMAIL_EXISTS: {
    title: AUTH_ERROR_MESSAGES.emailExistsTitle,
    message: AUTH_ERROR_MESSAGES.emailExistsMessage,
  },
  NETWORK_ERROR: {
    title: AUTH_ERROR_MESSAGES.networkErrorTitle,
    message: AUTH_ERROR_MESSAGES.networkErrorMessage,
  },
  UNKNOWN: {
    title: AUTH_ERROR_MESSAGES.unknownErrorTitle,
    message: AUTH_ERROR_MESSAGES.unknownErrorMessage,
  },
};

// ── Public helpers ────────────────────────────────────────

/**
 * Returns the user-friendly title string for a toast/banner heading.
 */
export const getAuthErrorTitle = (code: AuthErrorCode) => FRIENDLY[code].title;

/**
 * Turns a raw server / network error message into a typed `AuthErrorInfo`.
 */
export function classifyAuthError(raw: string): AuthErrorInfo {
  const msg = raw.toLowerCase();

  if (NETWORK_PATTERNS.some(p => msg.includes(p))) {
    return {
      code: 'NETWORK_ERROR',
      ...FRIENDLY.NETWORK_ERROR,
      display: 'toast',
    };
  }

  if (EMAIL_EXISTS_PATTERNS.some(p => msg.includes(p))) {
    return {
      code: 'EMAIL_EXISTS',
      ...FRIENDLY.EMAIL_EXISTS,
      display: 'inline',
    };
  }

  if (CREDENTIAL_PATTERNS.some(p => msg.includes(p))) {
    return {
      code: 'INVALID_CREDENTIALS',
      ...FRIENDLY.INVALID_CREDENTIALS,
      display: 'inline',
    };
  }

  return {
    code: 'UNKNOWN',
    message: raw || FRIENDLY.UNKNOWN.message,
    display: 'toast',
  };
}

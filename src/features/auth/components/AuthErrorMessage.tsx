import { useEffect } from 'react';
import { View } from 'react-native';

import { Typography } from '@components/index';
import { toast } from '@components/Toast';

import { getAuthErrorTitle, type AuthErrorInfo } from '../utils/authError';

interface AuthErrorMessageProps {
  /** Pass the classified error from `classifyAuthError`. Null/undefined hides the component. */
  error: AuthErrorInfo | null | undefined;
}

/**
 * Renders a server/network auth error in the appropriate way:
 *
 *   - `display: 'inline'` → shows a red Typography banner beneath the form.
 *   - `display: 'toast'`  → fires an imperative toast notification; renders nothing itself.
 *
 * Usage:
 * ```tsx
 * const [authError, setAuthError] = useState<AuthErrorInfo | null>(null);
 *
 * const onSubmit = async (data) => {
 *   const result = await signIn(data.email, data.password);
 *   setAuthError(result.error ? classifyAuthError(result.error.message) : null);
 * };
 *
 * // In JSX (e.g. below form fields):
 * <AuthErrorMessage error={authError} />
 * ```
 */
export const AuthErrorMessage = ({ error }: AuthErrorMessageProps) => {
  useEffect(() => {
    if (error?.display === 'toast') {
      toast.error(getAuthErrorTitle(error.code), error.message);
    }
  }, [error]);

  // Inline errors are rendered as a red banner; toast errors render nothing.
  if (!error || error.display !== 'inline') return null;

  return (
    <View
      className="mt-2 px-1"
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      <Typography variant="sm" className="text-red-500 font-primary-regular">
        {error.message}
      </Typography>
    </View>
  );
};

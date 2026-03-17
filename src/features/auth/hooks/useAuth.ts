import { useCallback } from 'react';
import { authClient } from '@lib/authClient';
import { useAuthStore, type AuthUser } from '@store/authStore';
import { AUTH_ERROR_MESSAGES } from '@constants/message';

type AuthError = { message: string };

// ── Sign In ───────────────────────────────────────────────

type SignInResult =
  | { user: AuthUser; error?: never }
  | { user?: never; error: AuthError };

export const useSignIn = () => {
  const setAuth = useAuthStore(s => s.setAuth);

  const signIn = useCallback(
    async (email: string, password: string): Promise<SignInResult> => {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error || !data) {
        return {
          error: {
            message: error?.message ?? AUTH_ERROR_MESSAGES.signInFailed,
          },
        };
      }

      const user = data.user as AuthUser;
      const token = data.token;
      setAuth(user, token);
      return { user };
    },
    [setAuth],
  );

  return signIn;
};

// ── Sign Up ───────────────────────────────────────────────

type SignUpParams = {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
};

type SignUpResult =
  | { user: AuthUser; error?: never }
  | { user?: never; error: AuthError };

export const useSignUp = () => {
  const signUp = useCallback(
    async ({
      fullName,
      email,
      password,
      phone,
    }: SignUpParams): Promise<SignUpResult> => {
      const { data, error } = await (authClient.signUp.email as Function)({
        name: fullName,
        email,
        password,
        phone: phone ?? null,
      });

      if (error || !data) {
        return {
          error: {
            message: error?.message ?? AUTH_ERROR_MESSAGES.registrationFailed,
          },
        };
      }

      const user = data.user as AuthUser;
      return { user };
    },
    [],
  );

  return signUp;
};

// ── Sign Out ──────────────────────────────────────────────

export const useSignOut = () => {
  const clearAuth = useAuthStore(s => s.clearAuth);

  const signOut = useCallback(async () => {
    await authClient.signOut().catch(() => {});
    clearAuth();
  }, [clearAuth]);

  return signOut;
};

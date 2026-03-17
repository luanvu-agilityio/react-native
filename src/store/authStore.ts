import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  image?: string | null;
  emailVerified: boolean;
};

type AuthState = {
  _hasHydrated: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  hasSeenOnboarding: boolean;
};

type AuthActions = {
  _setHasHydrated: (val: boolean) => void;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  markOnboardingSeen: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    set => ({
      _hasHydrated: false,
      isAuthenticated: false,
      user: null,
      token: null,
      hasSeenOnboarding: false,
      _setHasHydrated: val => set({ _hasHydrated: val }),
      setAuth: (user, token) => set({ isAuthenticated: true, user, token }),
      clearAuth: () => set({ isAuthenticated: false, user: null, token: null }),
      markOnboardingSeen: () => set({ hasSeenOnboarding: true }),
    }),
    {
      name: 'yumquick-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        hasSeenOnboarding: state.hasSeenOnboarding,
      }),
      onRehydrateStorage: () => state => {
        state?._setHasHydrated(true);
      },
    },
  ),
);

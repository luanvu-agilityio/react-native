import { useAuthStore, type AuthUser } from '../authStore';

jest.mock('@react-native-async-storage/async-storage', () => {
  const store: Record<string, string> = {};
  return {
    getItem: async (k: string) => store[k] ?? null,
    setItem: async (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: async (k: string) => {
      delete store[k];
    },
    clear: async () => {
      Object.keys(store).forEach(k => delete store[k]);
    },
  };
});

describe('auth store', () => {
  beforeEach(() => {
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
      token: null,
      hasSeenOnboarding: false,
    });
  });

  it('has sensible defaults', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.hasSeenOnboarding).toBe(false);
  });

  it('setAuth and clearAuth work', () => {
    const user: AuthUser = {
      id: 'u1',
      name: 'User',
      email: 'u@example.com',
      emailVerified: true,
    };

    useAuthStore.getState().setAuth(user, 'tok-123');
    const after = useAuthStore.getState();
    expect(after.isAuthenticated).toBe(true);
    expect(after.user).toEqual(user);
    expect(after.token).toBe('tok-123');

    useAuthStore.getState().clearAuth();
    const cleared = useAuthStore.getState();
    expect(cleared.isAuthenticated).toBe(false);
    expect(cleared.user).toBeNull();
    expect(cleared.token).toBeNull();
  });

  it('marks onboarding as seen', () => {
    useAuthStore.getState().markOnboardingSeen();
    expect(useAuthStore.getState().hasSeenOnboarding).toBe(true);
  });
});

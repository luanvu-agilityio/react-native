import { ReactNode } from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

import * as profileStore from '@store/profileStore';
import * as authStore from '@store/authStore';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 10, bottom: 5, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children?: ReactNode }) => children,
}));

jest.mock('@hooks/useSlideAnimation', () => () => ({
  translateX: 0,
  panelWidth: 300,
}));
jest.mock('@lib/navigationRef', () => ({ navigateTo: jest.fn() }));
jest.mock('@features/auth/hooks/useAuth', () => ({
  useSignOut: () => jest.fn(),
}));

import ProfileOverlay from '../ProfileOverlay';

describe('ProfileOverlay', () => {
  type UseProfileStore = typeof profileStore.useProfileStore;
  type ProfileSelector = Parameters<UseProfileStore>[0];
  type ProfileStateType = ProfileSelector extends (s: infer S) => unknown
    ? S
    : never;

  type UseAuthStore = typeof authStore.useAuthStore;
  type AuthSelector = Parameters<UseAuthStore>[0];
  type AuthStateType = AuthSelector extends (s: infer S) => unknown ? S : never;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders guest view when not authenticated', () => {
    const mockProfileState: ProfileStateType = {
      isProfileOpen: true,
      closeProfile: jest.fn(),
    } as unknown as ProfileStateType;

    jest
      .spyOn(profileStore, 'useProfileStore')
      .mockImplementation((selector: ProfileSelector) =>
        selector(mockProfileState),
      );

    const mockAuthState: AuthStateType = {
      user: null,
      isAuthenticated: false,
    } as unknown as AuthStateType;

    jest
      .spyOn(authStore, 'useAuthStore')
      .mockImplementation((selector: AuthSelector) => selector(mockAuthState));

    const { getByText } = render(<ProfileOverlay />);
    expect(getByText("You're browsing as a guest")).toBeTruthy();
  });

  it('renders authenticated view when user present', () => {
    const mockProfileState2: ProfileStateType = {
      isProfileOpen: true,
      closeProfile: jest.fn(),
    } as unknown as ProfileStateType;

    jest
      .spyOn(profileStore, 'useProfileStore')
      .mockImplementation((selector: ProfileSelector) =>
        selector(mockProfileState2),
      );

    const mockAuthState2: AuthStateType = {
      user: { name: 'John Doe', email: 'john@example.com' },
      isAuthenticated: true,
    } as unknown as AuthStateType;

    jest
      .spyOn(authStore, 'useAuthStore')
      .mockImplementation((selector: AuthSelector) => selector(mockAuthState2));

    const { getByText } = render(<ProfileOverlay />);
    expect(getByText('John Doe')).toBeTruthy();
  });
});

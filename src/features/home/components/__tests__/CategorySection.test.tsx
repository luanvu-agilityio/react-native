import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  createNavigationContainerRef: () => ({ current: null, isReady: () => false }),
  useNavigationState: () => ({ routes: [{ name: 'Home' }], index: 0 }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children?: ReactNode }) => children,
}));

jest.mock('../../hooks/useCategories', () => ({
  useCategories: () => ({ data: { data: [] }, isLoading: false }),
}));

import CategorySection from '../CategorySection';
import { ReactNode } from 'react';

describe('CategorySection', () => {
  it('renders without crashing when no categories', () => {
    const { toJSON } = render(<CategorySection />);
    expect(toJSON()).toBeTruthy();
  });
});

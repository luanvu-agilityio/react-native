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

jest.mock('@features/food-menu/hooks/useFoodItems', () => ({
  useFoodItems: () => ({ data: { data: [] }, isLoading: false }),
}));

import BestSellerSection from '../BestSellerSection';
import { ReactNode } from 'react';

describe('BestSellerSection', () => {
  it('renders without crashing when no items', () => {
    const { toJSON } = render(<BestSellerSection />);
    expect(toJSON()).toBeTruthy();
  });
});

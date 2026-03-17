import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  createNavigationContainerRef: () => ({ current: null, isReady: () => false }),
  useNavigationState: () => ({ routes: [{ name: 'Home' }], index: 0 }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children?: ReactNode }) => children,
}));

jest.mock('@features/home/components/FeaturedCard', () => ({
  FeaturedCard: (_props: unknown) => null,
}));

jest.mock('@features/home/components/GridCard', () => ({
  GridCard: (_props: unknown) => null,
}));

jest.mock('@features/food-menu/hooks/useFoodItems', () => ({
  useFoodItems: () => ({ data: { data: [] }, isLoading: false }),
}));

import RecommendationsScreen from '../RecommendationsScreen';
import { ReactNode } from 'react';

describe('RecommendationsScreen', () => {
  it('renders without crashing when no items', () => {
    const { toJSON } = render(<RecommendationsScreen />);
    expect(toJSON()).toBeTruthy();
  });
});

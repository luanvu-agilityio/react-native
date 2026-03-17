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

jest.mock('@features/food-menu/hooks/useFoodItems', () => ({
  useFoodItems: () => ({ data: { data: [] }, isLoading: false }),
}));

jest.mock('@store/cartStore', () => ({
  useCartStore: (
    selector: (s: {
      addItem: (...args: unknown[]) => unknown;
      openCart: (...args: unknown[]) => unknown;
    }) => unknown,
  ) => {
    const slice = { addItem: jest.fn(), openCart: jest.fn() };
    return selector(slice as unknown as Parameters<typeof selector>[0]);
  },
}));

jest.mock('@features/home/components/BestSellerCard', () => ({
  BestSellerCard: (_props: unknown) => null,
}));

import BestSellerScreen from '../BestSellerScreen';
import { ReactNode } from 'react';

describe('BestSellerScreen', () => {
  it('renders without crashing when no items', () => {
    const { toJSON } = render(<BestSellerScreen />);
    expect(toJSON()).toBeTruthy();
  });
});

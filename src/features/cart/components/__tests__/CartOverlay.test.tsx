import { render } from '@testing-library/react-native';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0 }),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('@store/cartStore', () => ({ useCartStore: jest.fn() }));
jest.mock('@store/authStore', () => ({ useAuthStore: jest.fn() }));

import CartOverlay from '../CartOverlay';
import { useCartStore } from '@store/cartStore';

describe('CartOverlay', () => {
  beforeEach(() => jest.resetAllMocks());

  it('renders empty cart view when no items', () => {
    const mockCart = { isCartOpen: true, closeCart: jest.fn(), items: [] };
    const mockedUseCartStore = useCartStore as unknown as jest.Mock;
    mockedUseCartStore.mockImplementation((selector: (s: unknown) => unknown) =>
      selector(mockCart),
    );

    const { getByText } = render(<CartOverlay />);
    expect(getByText('Your cart is empty')).toBeTruthy();
  });
});

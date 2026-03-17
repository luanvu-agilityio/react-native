import { render } from '@testing-library/react-native';

jest.mock('@components/Toast', () => ({
  toast: { info: jest.fn(), success: jest.fn() },
}));
jest.mock('@lib/navigationRef', () => ({ navigateTo: jest.fn() }));
jest.mock('@store/cartStore', () => ({ useCartStore: jest.fn() }));
jest.mock('@store/authStore', () => ({ useAuthStore: jest.fn() }));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children?: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

import CartWithItems from '../CartWithItems';
import { useCartStore } from '@store/cartStore';
import { useAuthStore } from '@store/authStore';
import type { CartItem } from '@store/cartStore';

describe('CartWithItems', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders list header with item count', () => {
    const mockItem: CartItem = {
      cartKey: 'k1',
      id: '1',
      name: 'Pizza',
      price: 8,
      quantity: 1,
      topping: undefined,
      image: undefined,
      bgColor: '#fff',
    };

    const mockCartState = {
      items: [mockItem],
      updateQuantity: jest.fn(),
      getSubtotal: () => 8,
      getTaxAndFees: () => 0,
      getDelivery: () => 0,
      getTotal: () => 8,
      getItemCount: () => 1,
      closeCart: jest.fn(),
    };

    const mockedUseCartStore = useCartStore as unknown as jest.Mock;
    mockedUseCartStore.mockImplementation((selector: (s: unknown) => unknown) =>
      selector(mockCartState),
    );

    const mockedUseAuthStore = useAuthStore as unknown as jest.Mock;
    mockedUseAuthStore.mockImplementation((selector: (s: unknown) => unknown) =>
      selector({ isAuthenticated: true }),
    );

    const { getByText } = render(<CartWithItems />);
    expect(getByText('You have 1 items in the cart')).toBeTruthy();
  });
});

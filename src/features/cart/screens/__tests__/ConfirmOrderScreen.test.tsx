import { render } from '@testing-library/react-native';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@store/cartStore', () => ({ useCartStore: jest.fn() }));

import ConfirmOrderScreen from '../ConfirmOrderScreen';
import { useCartStore } from '@store/cartStore';
import type { CartItem } from '@store/cartStore';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
    dispatch: jest.fn(),
    navigate: jest.fn(),
  }),
  CommonActions: { reset: jest.fn() },
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
    dispatch: jest.fn(),
    navigate: jest.fn(),
  }),
  useNavigationState: (cb: (s: unknown) => unknown) =>
    cb({ index: 0, routes: [{ name: 'Home' }] }),
  CommonActions: { reset: jest.fn() },
}));

jest.mock('@lib/navigationRef', () => ({
  navigationRef: { isReady: () => true, current: null },
  navigateTo: jest.fn(),
}));

describe('ConfirmOrderScreen', () => {
  beforeEach(() => jest.resetAllMocks());

  it('renders order summary and place order button', () => {
    const mockItem: CartItem = {
      cartKey: 'k1',
      id: '1',
      name: 'Sushi',
      price: 10,
      quantity: 2,
      topping: undefined,
      image: undefined,
      bgColor: '#fff',
    };

    const mockCart = {
      items: [mockItem],
      updateQuantity: jest.fn(),
      removeItem: jest.fn(),
      getSubtotal: () => 20,
      getTaxAndFees: () => 1,
      getDelivery: () => 2,
      getTotal: () => 23,
    };

    const mockedUseCartStore = useCartStore as unknown as jest.Mock;
    mockedUseCartStore.mockImplementation((selector: (s: unknown) => unknown) =>
      selector(mockCart),
    );

    const { getByText } = render(<ConfirmOrderScreen />);
    expect(getByText(/Order Summary/i)).toBeTruthy();
    expect(getByText(/Place Order/i)).toBeTruthy();
  });
});

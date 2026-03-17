import { render } from '@testing-library/react-native';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@store/cartStore', () => ({ useCartStore: jest.fn() }));

import PaymentScreen from '../PaymentScreen';
import { useCartStore } from '@store/cartStore';

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

describe('PaymentScreen', () => {
  beforeEach(() => jest.resetAllMocks());

  it('renders shipping address and total', () => {
    const mockCart = {
      items: [{ id: '1', name: 'Burger', quantity: 1 } as unknown],
      getTotal: () => 12.5,
    };

    const mockedUseCartStore = useCartStore as unknown as jest.Mock;
    mockedUseCartStore.mockImplementation((selector: (s: unknown) => unknown) =>
      selector(mockCart),
    );

    const { getByText } = render(<PaymentScreen />);
    expect(getByText(/Shipping Address/i)).toBeTruthy();
    expect(getByText(/\$12\.50/)).toBeTruthy();
  });
});

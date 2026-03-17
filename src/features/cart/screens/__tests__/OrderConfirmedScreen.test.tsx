import { render } from '@testing-library/react-native';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@store/cartStore', () => ({ useCartStore: jest.fn() }));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('@hooks/useLoadingAnimation', () => ({
  __esModule: true,
  default: (onFinished: () => void) => {
    if (typeof onFinished === 'function') setTimeout(onFinished, 0);
    return { scaleAnim: 1, opacityAnim: 1, dots: 3 };
  },
}));

import OrderConfirmedScreen from '../OrderConfirmedScreen';
import { useCartStore } from '@store/cartStore';
import type { CheckoutScreenProps } from '@app-types/navigation';

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

describe('OrderConfirmedScreen', () => {
  beforeEach(() => jest.resetAllMocks());

  it('calls clearCart and shows result when loading finishes', async () => {
    const mockCart = { clearCart: jest.fn() };
    const mockedUseCartStore = useCartStore as unknown as jest.Mock;
    mockedUseCartStore.mockImplementation((selector: (s: unknown) => unknown) =>
      selector(mockCart),
    );

    const route = {
      params: { success: true },
    } as unknown as CheckoutScreenProps<'OrderConfirmed'>['route'];
    const nav = {
      navigate: jest.fn(),
    } as unknown as CheckoutScreenProps<'OrderConfirmed'>['navigation'];
    const { findByText } = render(
      <OrderConfirmedScreen navigation={nav} route={route} />,
    );

    expect(await findByText(/Order Confirmed!/i)).toBeTruthy();
    expect(mockCart.clearCart).toHaveBeenCalled();
  });
});

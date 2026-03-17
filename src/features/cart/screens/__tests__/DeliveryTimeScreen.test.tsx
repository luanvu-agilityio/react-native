import { render } from '@testing-library/react-native';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

import DeliveryTimeScreen from '../DeliveryTimeScreen';

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

describe('DeliveryTimeScreen', () => {
  it('renders confirm order and delivery info', () => {
    const { getByText } = render(<DeliveryTimeScreen />);
    expect(getByText(/Confirm Order/i)).toBeTruthy();
    expect(getByText(/Estimated Delivery/i)).toBeTruthy();
  });
});

import * as React from 'react';
import renderer, { act } from 'react-test-renderer';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

const mockOpenCart = jest.fn();
type CartState = { openCart: typeof mockOpenCart; items: unknown[] };
jest.mock('@store/cartStore', () => ({
  useCartStore: (selector: (s: CartState) => unknown) =>
    selector({ openCart: mockOpenCart, items: [] }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@components/index', () => {
  const { Text } = require('react-native');
  return {
    Heading: ({ children }: { children?: React.ReactNode }) =>
      Text ? <Text>{children}</Text> : null,
    Typography: ({ children }: { children?: React.ReactNode }) =>
      Text ? <Text>{children}</Text> : null,
    TextInput: (_props: { placeholder?: string }) => null,
  };
});

import HomeFeatureHeader from '../index';

describe('HomeFeatureHeader', () => {
  it('calls openCart when shopping cart button pressed and navigates for others', () => {
    let testRenderer: renderer.ReactTestRenderer | undefined;
    act(() => {
      testRenderer = renderer.create(<HomeFeatureHeader />);
    });
    const tree = testRenderer!.root;

    const cartBtn = tree.findAllByProps({
      accessibilityLabel: 'Shopping cart',
    })[0];
    expect(cartBtn).toBeTruthy();
    act(() => {
      cartBtn.props.onPress();
    });
    expect(mockOpenCart).toHaveBeenCalled();

    const notifBtn = tree.findAllByProps({
      accessibilityLabel: 'Notifications',
    })[0];
    expect(notifBtn).toBeTruthy();
    act(() => {
      notifBtn.props.onPress();
    });
    expect(mockNavigate).toHaveBeenCalledWith('HomeStack', {
      screen: 'ComingSoon',
    });
  });

  it('renders greeting when provided', () => {
    const greeting = { title: 'Hi', subtitle: 'There' };
    let testRenderer: renderer.ReactTestRenderer | undefined;
    act(() => {
      testRenderer = renderer.create(<HomeFeatureHeader greeting={greeting} />);
    });
    const tree = testRenderer!.toJSON();
    expect(JSON.stringify(tree)).toContain('Hi');
    expect(JSON.stringify(tree)).toContain('There');
  });
});

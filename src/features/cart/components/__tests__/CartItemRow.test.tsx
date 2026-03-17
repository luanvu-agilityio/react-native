import { render } from '@testing-library/react-native';
import CartItemRow from '../CartItemRow';
import type { CartItem } from '@store/cartStore';

const item: CartItem = {
  cartKey: 'k1',
  id: '1',
  name: 'Fries',
  price: 3.5,
  quantity: 1,
  topping: undefined,
  image: undefined,
  bgColor: '#fff',
};

describe('CartItemRow', () => {
  it('renders item data', () => {
    const { getByText } = render(
      <CartItemRow item={item} onQuantityChange={() => {}} />,
    );
    expect(getByText('Fries')).toBeTruthy();
    expect(getByText('$3.50')).toBeTruthy();
  });
});

import { render } from '@testing-library/react-native';
import OrderItemRow from '../OrderItemRow';
import type { CartItem } from '@store/cartStore';

const item: CartItem = {
  cartKey: 'id::',
  id: 'id',
  name: 'Burger',
  price: 5,
  quantity: 2,
  topping: 'Cheese',
  image: undefined,
  bgColor: '#fff',
};

describe('OrderItemRow', () => {
  it('renders item name, price and topping', () => {
    const { getByText } = render(
      <OrderItemRow
        item={item}
        onRemove={() => {}}
        onQuantityChange={() => {}}
      />,
    );
    expect(getByText('Burger')).toBeTruthy();
    expect(getByText('$5.00')).toBeTruthy();
    expect(getByText('Cheese')).toBeTruthy();
  });
});

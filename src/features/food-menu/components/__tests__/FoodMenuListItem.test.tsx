import { render, fireEvent } from '@testing-library/react-native';
import FoodMenuListItem from '../FoodMenuListItem';
import type { FoodMenuItem } from '../../types';

const sampleItem: FoodMenuItem = {
  id: '1',
  name: 'Test Sandwich',
  price: '$5.00',
  rating: '4.2',
  description: 'Yummy',
  bgColor: '#FFF',
  image: { uri: 'https://example.com/img.png' },
};

describe('FoodMenuListItem', () => {
  it('renders name and price and responds to press', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <FoodMenuListItem item={sampleItem} onPress={onPress} />,
    );

    const name = getByText('Test Sandwich');
    expect(name).toBeTruthy();
    expect(getByText('$5.00')).toBeTruthy();

    fireEvent.press(name);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

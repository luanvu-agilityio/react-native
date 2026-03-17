import { render } from '@testing-library/react-native';
import CartEmpty from '../CartEmpty';

describe('CartEmpty', () => {
  it('renders empty state texts', () => {
    const { getByText } = render(<CartEmpty onAdd={() => {}} />);
    expect(getByText('Your cart is empty')).toBeTruthy();
    expect(getByText('Want To Add Something?')).toBeTruthy();
  });
});

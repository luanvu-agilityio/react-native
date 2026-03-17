import { render } from '@testing-library/react-native';
import FoodMenuSkeleton from '../FoodMenuSkeleton';

describe('FoodMenuSkeleton', () => {
  it('renders skeleton items', () => {
    const { toJSON } = render(<FoodMenuSkeleton />);
    expect(toJSON()).toBeTruthy();
  });
});

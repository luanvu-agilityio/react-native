import { render } from '@testing-library/react-native';

import BestSellerScreenSkeleton from '../BestSellerScreenSkeleton';

describe('BestSellerScreenSkeleton', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<BestSellerScreenSkeleton />);
    expect(toJSON()).toBeTruthy();
  });
});

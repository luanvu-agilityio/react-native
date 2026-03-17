import { render } from '@testing-library/react-native';

import RecommendationsScreenSkeleton from '../RecommendationsScreenSkeleton';

describe('RecommendationsScreenSkeleton', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<RecommendationsScreenSkeleton />);
    expect(toJSON()).toBeTruthy();
  });
});

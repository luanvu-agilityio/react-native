import { render } from '@testing-library/react-native';

jest.mock('../../components', () => ({
  CategorySection: () => null,
  BestSellerSection: () => null,
  PromoBanner: () => null,
  RecommendSection: () => null,
}));

jest.mock('@components/index', () => ({
  Divider: () => null,
}));

jest.mock('@components/BottomNavigationItem/BottomNav', () => () => null);
jest.mock('@components/features/HomeFeatureHeader', () => () => null);

import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toBeTruthy();
  });
});

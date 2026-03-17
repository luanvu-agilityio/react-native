import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  createNavigationContainerRef: () => ({ current: null, isReady: () => false }),
  useNavigationState: () => ({ routes: [{ name: 'FoodMenu' }], index: 0 }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children?: React.ReactNode }) => children,
}));

import FoodDetailScreenSkeleton from '../FoodDetailScreenSkeleton';

describe('FoodDetailScreenSkeleton', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<FoodDetailScreenSkeleton />);
    expect(toJSON()).toBeTruthy();
  });
});

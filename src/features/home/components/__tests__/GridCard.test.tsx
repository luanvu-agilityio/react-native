import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  createNavigationContainerRef: () => ({ current: null, isReady: () => false }),
  useNavigationState: () => ({ routes: [{ name: 'Home' }], index: 0 }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children?: ReactNode }) => children,
}));

import { GridCard } from '../GridCard';
import type { FoodItem } from '../../types';
import { ReactNode } from 'react';

const mockItem = {
  id: '1',
  name: 'Apple',
  price: '$1.00',
  rating: '4.5',
  description: 'Tasty',
  bgColor: '#ffffff',
  image: { uri: 'https://example.com/img.png' },
} as unknown as FoodItem;

describe('GridCard', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<GridCard item={mockItem} onPress={() => {}} />);
    expect(toJSON()).toBeTruthy();
  });
});

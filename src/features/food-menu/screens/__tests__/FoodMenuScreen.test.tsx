import React from 'react';
import { render } from '@testing-library/react-native';
import type { HomeScreenProps } from '@app-types/navigation';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  createNavigationContainerRef: () => ({ current: null, isReady: () => false }),
  useNavigationState: () => ({ routes: [{ name: 'FoodMenu' }], index: 0 }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children?: React.ReactNode }) => children,
}));

jest.mock('../../hooks/useFoodItems', () => ({
  useFoodItems: () => ({
    isLoading: false,
    data: {
      data: [
        {
          id: '1',
          name: 'Burger',
          price: '8.5',
          rating: '4.0',
          description: 'Tasty',
          bgColor: '#FFF',
        },
      ],
    },
  }),
}));

import FoodMenuScreen from '../FoodMenuScreen';

describe('FoodMenuScreen', () => {
  it('renders list items when data is present', () => {
    const route: HomeScreenProps<'FoodMenu'>['route'] = {
      key: 'FoodMenu-1',
      name: 'FoodMenu',
      params: {},
    };

    const navigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
      dispatch: jest.fn(),
      addListener: jest.fn(() => jest.fn()),
      removeListener: jest.fn(),
      canGoBack: jest.fn(() => false),
      isFocused: jest.fn(() => false),
      getParent: jest.fn(() => null),
    } as unknown as HomeScreenProps<'FoodMenu'>['navigation'];

    const { getByText } = render(
      <FoodMenuScreen route={route} navigation={navigation} />,
    );

    expect(getByText('Burger')).toBeTruthy();
  });
});

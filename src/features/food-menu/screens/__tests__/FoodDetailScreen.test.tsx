import { render, fireEvent } from '@testing-library/react-native';
import type { HomeScreenProps } from '@app-types/navigation';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn(), navigate: jest.fn() }),
  createNavigationContainerRef: () => ({ current: null, isReady: () => false }),
  useNavigationState: () => ({ routes: [{ name: 'FoodMenu' }], index: 0 }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children?: React.ReactNode }) => children,
}));

jest.mock('@store/cartStore', () => {
  const addItem = jest.fn();
  return {
    useCartStore: (selector: (s: { addItem: jest.Mock }) => unknown) =>
      selector({ addItem }),
    __addItemMock__: addItem,
  };
});

jest.mock('@components/Toast', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock('../../hooks/useFoodItem', () => ({
  useFoodItem: () => ({ isLoading: false, data: { data: { toppings: [] } } }),
}));

import FoodDetailScreen from '../FoodDetailScreen';

describe('FoodDetailScreen', () => {
  it('adds item to cart and shows toast when Add to Cart pressed', () => {
    const route: HomeScreenProps<'FoodDetail'>['route'] = {
      key: 'FoodDetail-1',
      name: 'FoodDetail',
      params: {
        id: '1',
        name: 'Burger',
        price: '$5.00',
        rating: '4.2',
        description: 'Tasty',
        bgColor: '#FFF',
        image: 'https://example.com/img.png',
      },
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
    } as unknown as HomeScreenProps<'FoodDetail'>['navigation'];

    const { getByText } = render(
      <FoodDetailScreen route={route} navigation={navigation} />,
    );

    const addButton = getByText('Add to Cart');
    fireEvent.press(addButton);

    const store = require('@store/cartStore');
    const { toast } = require('@components/Toast');

    expect(store.__addItemMock__).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('../src/features/food-menu/hooks/useFoodItems', () => ({
  useFoodItems: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  createNavigationContainerRef: () => ({
    isReady: () => false,
    dispatch: jest.fn(),
  }),
  CommonActions: { navigate: jest.fn() },
}));

import { useFoodItems } from '../src/features/food-menu/hooks/useFoodItems';
import BestSellerSection from '../src/features/home/components/BestSellerSection';

const mockedUseFoodItems = useFoodItems as jest.MockedFunction<
  typeof useFoodItems
>;

test('BestSellerSection shows skeleton when loading', () => {
  mockedUseFoodItems.mockReturnValue({
    data: undefined,
    isLoading: true,
  } as unknown as ReturnType<typeof useFoodItems>);
  const { queryByText } = render(<BestSellerSection />);
  expect(queryByText('Best Seller')).toBeNull();
});

test('BestSellerSection renders items when data available', () => {
  const now = new Date().toISOString();
  const apiFood = {
    id: 'f1',
    categoryId: 'c1',
    name: 'Burger',
    price: '12',
    originalPrice: null,
    discount: null,
    rating: null,
    description: null,
    longDescription: null,
    bgColor: null,
    imageUrl: null,
    isBestSeller: true,
    isRecommended: false,
    isAvailable: true,
    createdAt: now,
    updatedAt: now,
  };

  mockedUseFoodItems.mockReturnValue({
    data: { data: [apiFood] },
    isLoading: false,
  } as unknown as ReturnType<typeof useFoodItems>);

  const tree = render(<BestSellerSection />).toJSON();

  function findByA11yLabel(node: any, label: string): any | null {
    if (!node) return null;
    if (node.props && node.props.accessibilityLabel === label) return node;
    if (!node.children) return null;
    for (const child of node.children) {
      const found = findByA11yLabel(child, label);
      if (found) return found;
    }
    return null;
  }

  const headerExists = (() => {
    const r = render(<BestSellerSection />);
    try {
      return Boolean(r.getByText('Best Seller'));
    } catch {
      return false;
    }
  })();

  expect(headerExists).toBe(true);
  expect(findByA11yLabel(tree, 'Burger')).toBeTruthy();
});

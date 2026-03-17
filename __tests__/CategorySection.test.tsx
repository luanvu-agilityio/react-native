import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('../src/features/home/hooks/useCategories', () => ({
  useCategories: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  createNavigationContainerRef: () => ({
    isReady: () => false,
    dispatch: jest.fn(),
  }),
  CommonActions: { navigate: jest.fn() },
}));

import { useCategories } from '../src/features/home/hooks/useCategories';
import CategorySection from '../src/features/home/components/CategorySection';

const mockedUseCategories = useCategories as jest.MockedFunction<
  typeof useCategories
>;

test('CategorySection shows skeleton when loading', () => {
  mockedUseCategories.mockReturnValue({
    data: undefined,
    isLoading: true,
  } as unknown as ReturnType<typeof useCategories>);
  const tree = render(<CategorySection />).toJSON();

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

  expect(findByA11yLabel(tree, 'Snacks')).toBeNull();
});

test('CategorySection renders category pills when data available', () => {
  const apiCats = [
    { id: 'snacks', label: 'Snacks', sortOrder: 1 },
    { id: 'meal', label: 'Meal', sortOrder: 2 },
  ];

  mockedUseCategories.mockReturnValue({
    data: { data: apiCats },
    isLoading: false,
  } as unknown as ReturnType<typeof useCategories>);

  const tree = render(<CategorySection />).toJSON();
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
  expect(findByA11yLabel(tree, 'Snacks')).toBeTruthy();
  expect(findByA11yLabel(tree, 'Meal')).toBeTruthy();
});

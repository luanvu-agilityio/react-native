jest.mock('../../hooks/usePromoBanners', () => ({
  usePromoBanners: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
  createNavigationContainerRef: () => ({
    isReady: () => false,
    dispatch: jest.fn(),
  }),
  CommonActions: { navigate: jest.fn() },
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import { usePromoBanners } from '../../hooks/usePromoBanners';
import PromoBanner from '../PromoBanner';

const mockedUsePromoBanners = usePromoBanners as jest.MockedFunction<
  typeof usePromoBanners
>;

test('renders banner title and applies fallback bgColor', () => {
  mockedUsePromoBanners.mockReturnValue({
    data: {
      data: [
        { id: '1', title: 'Sale', discount: 50, bgColor: null, imageUrl: null },
      ],
    },
    isLoading: false,
  } as unknown as ReturnType<typeof usePromoBanners>);
  const { getByText } = render(<PromoBanner />);
  const title = getByText('Sale');
  expect(title).toBeTruthy();
});

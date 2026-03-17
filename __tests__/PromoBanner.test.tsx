import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('../src/features/home/hooks/usePromoBanners', () => ({
  usePromoBanners: jest.fn(),
}));
const {
  usePromoBanners: mockedUsePromoBanners,
} = require('../src/features/home/hooks/usePromoBanners');
const { BANNER_BG_COLORS } = require('../src/features/home/constants/config');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));
const PromoBanner =
  require('../src/features/home/components/PromoBanner').default;

const usePromoBanners = mockedUsePromoBanners as jest.MockedFunction<
  typeof mockedUsePromoBanners
>;

describe('PromoBanner', () => {
  beforeEach(() => jest.resetAllMocks());

  it('renders banner title and applies fallback bgColor', () => {
    usePromoBanners.mockReturnValue({
      data: {
        data: [
          {
            id: '1',
            title: 'Sale',
            discount: 50,
            bgColor: null,
            imageUrl: null,
          },
        ],
      },
      isLoading: false,
    } as any);

    const { getByText } = render(<PromoBanner />);
    const title = getByText('Sale');
    expect(title).toBeTruthy();

    // The backgroundColor is applied on an ancestor View. Walk up the tree to find it.
    let node: any = title;
    let foundBg: string | undefined;
    for (let i = 0; i < 6 && node; i += 1) {
      node = node.parent;
      const s = node?.props?.style;
      const candidate = Array.isArray(s)
        ? s.find((x: any) => x && x.backgroundColor)?.backgroundColor
        : s?.backgroundColor;
      if (candidate) {
        foundBg = candidate;
        break;
      }
    }

    expect(foundBg).toBeDefined();
    expect(foundBg).toBe(BANNER_BG_COLORS[0]);
  });

  it('renders skeleton when loading', () => {
    usePromoBanners.mockReturnValue({
      data: undefined,
      isLoading: true,
    } as any);

    const { queryByText } = render(<PromoBanner />);
    expect(queryByText('Sale')).toBeNull();
  });
});

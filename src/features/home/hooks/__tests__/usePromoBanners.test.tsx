jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@constants/queryKeys', () => ({
  queryKeys: { promoBanners: { list: () => ['promoBanners'] } },
}));

jest.mock('@services/promoBanners', () => ({
  getPromoBanners: jest.fn(),
}));

import { usePromoBanners } from '../usePromoBanners';

const { useQuery } = require('@tanstack/react-query');
const { getPromoBanners } = require('@services/promoBanners');

describe('usePromoBanners', () => {
  it('calls useQuery with expected key and function', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
    });

    usePromoBanners();

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['promoBanners'],
        queryFn: getPromoBanners,
      }),
    );
  });
});

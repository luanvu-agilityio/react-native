jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@constants/queryKeys', () => ({
  queryKeys: { categories: { list: () => ['categories'] } },
}));

jest.mock('@services/categories', () => ({
  getCategories: jest.fn(),
}));

import { useCategories } from '../useCategories';

const { useQuery } = require('@tanstack/react-query');
const { getCategories } = require('@services/categories');

describe('useCategories', () => {
  it('calls useQuery with expected key and function', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
    });

    useCategories();

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ['categories'],
        queryFn: getCategories,
      }),
    );
  });
});

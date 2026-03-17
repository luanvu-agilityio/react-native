import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@constants/queryKeys';
import { getCategories } from '@services/categories';

export const useCategories = () =>
  useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: getCategories,
  });

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@constants/queryKeys';
import { getPromoBanners } from '@services/promoBanners';

export const usePromoBanners = () =>
  useQuery({
    queryKey: queryKeys.promoBanners.list(),
    queryFn: getPromoBanners,
  });

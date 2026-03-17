import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@constants/queryKeys';
import { getFoodItemById } from '@services/foodItems';

export const useFoodItem = (id: string) =>
  useQuery({
    queryKey: queryKeys.foodItems.detail(id),
    queryFn: () => getFoodItemById(id),
    enabled: Boolean(id),
  });

import { useQuery } from '@tanstack/react-query';
import { queryKeys, type FoodItemsParams } from '@constants/queryKeys';
import { getFoodItems } from '@services/foodItems';

export const useFoodItems = (params?: FoodItemsParams) =>
  useQuery({
    queryKey: queryKeys.foodItems.list(params),
    queryFn: () => getFoodItems(params),
  });

import { apiClient } from '@lib/apiClient';
import type {
  ApiFoodItem,
  ApiFoodItemDetail,
  ApiListResponse,
  ApiItemResponse,
} from '@app-types/api';
import type { FoodItemsParams } from '@constants/queryKeys';

// Constants
import { API_FOOD_ITEMS } from '@constants/api-routes';

const buildQuery = (params?: FoodItemsParams): string => {
  if (!params) return '';
  const q = new URLSearchParams();
  if (params.categoryId) q.set('categoryId', params.categoryId);
  if (params.isBestSeller) q.set('isBestSeller', 'true');
  if (params.isRecommended) q.set('isRecommended', 'true');
  if (params.limit !== undefined) q.set('limit', String(params.limit));
  if (params.offset !== undefined) q.set('offset', String(params.offset));
  const str = q.toString();
  return str ? `?${str}` : '';
};

export const getFoodItems = (
  params?: FoodItemsParams,
): Promise<ApiListResponse<ApiFoodItem>> =>
  apiClient.get(`${API_FOOD_ITEMS}${buildQuery(params)}`);

export const getFoodItemById = (
  id: string,
): Promise<ApiItemResponse<ApiFoodItemDetail>> =>
  apiClient.get(`${API_FOOD_ITEMS}/${id}`);

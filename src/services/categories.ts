import { apiClient } from '@lib/apiClient';
import { ApiCategory, ApiListResponse } from '@app-types/api';
import { API_CATEGORIES } from '@constants/api-routes';

export const getCategories = (): Promise<ApiListResponse<ApiCategory>> =>
  apiClient.get(API_CATEGORIES);

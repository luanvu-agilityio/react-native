import { apiClient } from '@lib/apiClient';
import type { ApiPromoBanner, ApiListResponse } from '@app-types/api';
import { API_PROMO_BANNERS } from '@constants/api-routes';

export const getPromoBanners = (): Promise<ApiListResponse<ApiPromoBanner>> =>
  apiClient.get(API_PROMO_BANNERS);

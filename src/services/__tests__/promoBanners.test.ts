import { apiClient } from '@lib/apiClient';
import { API_PROMO_BANNERS } from '@constants/api-routes';

jest.mock('@lib/apiClient', () => ({ apiClient: { get: jest.fn() } }));

import { getPromoBanners } from '../promoBanners';

describe('getPromoBanners service', () => {
  it('calls apiClient.get with API_PROMO_BANNERS and returns response', async () => {
    const resp = { data: [{ id: 'p1' }], total: 1 };
    (apiClient.get as jest.Mock).mockResolvedValueOnce(resp);

    const result = await getPromoBanners();
    expect(apiClient.get).toHaveBeenCalledWith(API_PROMO_BANNERS);
    expect(result).toBe(resp);
  });
});

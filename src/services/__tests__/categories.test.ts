import { apiClient } from '@lib/apiClient';
import { API_CATEGORIES } from '@constants/api-routes';

jest.mock('@lib/apiClient', () => ({ apiClient: { get: jest.fn() } }));

import { getCategories } from '../categories';

describe('getCategories service', () => {
  it('calls apiClient.get with API_CATEGORIES and returns response', async () => {
    const resp = { data: [{ id: 'c1' }], total: 1 };
    (apiClient.get as jest.Mock).mockResolvedValueOnce(resp);

    const result = await getCategories();
    expect(apiClient.get).toHaveBeenCalledWith(API_CATEGORIES);
    expect(result).toBe(resp);
  });
});

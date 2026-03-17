import { apiClient } from '@lib/apiClient';
import { API_FOOD_ITEMS } from '@constants/api-routes';

jest.mock('@lib/apiClient', () => ({ apiClient: { get: jest.fn() } }));

import { getFoodItems, getFoodItemById } from '../foodItems';

describe('foodItems service', () => {
  beforeEach(() => jest.clearAllMocks());

  it('calls apiClient.get for list without params', async () => {
    const resp = { data: [], total: 0 };
    (apiClient.get as jest.Mock).mockResolvedValueOnce(resp);

    const result = await getFoodItems();
    expect(apiClient.get).toHaveBeenCalledWith(API_FOOD_ITEMS);
    expect(result).toBe(resp);
  });

  it('builds query string from params and calls apiClient.get', async () => {
    const resp = { data: [], total: 0 };
    (apiClient.get as jest.Mock).mockResolvedValueOnce(resp);

    const params = { categoryId: 'cat1', isBestSeller: true, limit: 5 };
    const result = await getFoodItems(params);

    expect(apiClient.get).toHaveBeenCalledWith(
      `${API_FOOD_ITEMS}?categoryId=cat1&isBestSeller=true&limit=5`,
    );
    expect(result).toBe(resp);
  });

  it('calls apiClient.get for detail by id', async () => {
    const resp = { data: { id: 'f1' } };
    (apiClient.get as jest.Mock).mockResolvedValueOnce(resp);

    const result = await getFoodItemById('f1');
    expect(apiClient.get).toHaveBeenCalledWith(`${API_FOOD_ITEMS}/f1`);
    expect(result).toBe(resp);
  });
});

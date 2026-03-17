import { queryKeys } from '@constants/queryKeys';

describe('queryKeys', () => {
  it('builds categories keys', () => {
    expect(queryKeys.categories.all()).toEqual(['categories']);
    expect(queryKeys.categories.list()).toEqual(['categories', 'list']);
  });

  it('builds foodItems keys', () => {
    const params = { categoryId: 'c1', limit: 10 };
    expect(queryKeys.foodItems.all()).toEqual(['food-items']);
    expect(queryKeys.foodItems.list(params)).toEqual([
      'food-items',
      'list',
      params,
    ]);
    expect(queryKeys.foodItems.detail('abc')).toEqual([
      'food-items',
      'detail',
      'abc',
    ]);
  });

  it('builds promoBanners keys', () => {
    expect(queryKeys.promoBanners.all()).toEqual(['promo-banners']);
    expect(queryKeys.promoBanners.list()).toEqual(['promo-banners', 'list']);
  });
});

import {
  apiPromoBannerToPromoBannerItem,
  apiFoodItemToFoodItem,
} from '../src/features/home/utils/mappers';
import type { ApiPromoBanner, ApiFoodItem } from '../src/types/api';

describe('mappers', () => {
  test('apiPromoBannerToPromoBannerItem applies fallback bgColor', () => {
    const apiBanner: ApiPromoBanner = {
      id: '1',
      title: 'Test',
      subtitle: null,
      discount: null,
      bgColor: null,
      sortOrder: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      imageUrl: null,
      foodName: null,
      foodPrice: null,
      foodOriginalPrice: null,
      foodRating: null,
      foodDescription: null,
      foodBgColor: null,
    };

    const item = apiPromoBannerToPromoBannerItem(apiBanner);

    expect(item.id).toBe('1');
    expect(item.title).toBe('Test');
    expect(item.bgColor).toBe('#E95322');
  });

  test('apiFoodItemToFoodItem formats price and applies bgColor fallback', () => {
    const now = new Date().toISOString();
    const apiFood: ApiFoodItem = {
      id: 'f1',
      categoryId: 'c1',
      name: 'Burger',
      price: '12',
      originalPrice: null,
      discount: null,
      rating: null,
      description: null,
      longDescription: null,
      bgColor: null,
      imageUrl: 'https://example.com/img.jpg',
      isBestSeller: false,
      isRecommended: false,
      isAvailable: true,
      createdAt: now,
      updatedAt: now,
    };

    const mapped = apiFoodItemToFoodItem(apiFood);

    expect(mapped.id).toBe('f1');
    expect(mapped.price).toBe('$12.00');
    expect(mapped.bgColor).toBe('#FFDECF');
    expect(mapped.image).toEqual({ uri: 'https://example.com/img.jpg' });
  });
});

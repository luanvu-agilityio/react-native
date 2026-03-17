import {
  apiCategoryToCategoryItem,
  apiFoodItemToFoodItem,
  apiPromoBannerToPromoBannerItem,
} from '../mappers';
import type { ApiCategory, ApiFoodItem, ApiPromoBanner } from '@app-types/api';

describe('mappers', () => {
  it('maps category correctly', () => {
    const api: ApiCategory = { id: 'snacks', label: 'Snacks' } as ApiCategory;
    const out = apiCategoryToCategoryItem(api);
    expect(out.key).toBe('snacks');
    expect(out.label).toBe('Snacks');
    expect(out.Icon).toBeDefined();
  });

  it('maps food item with formatting', () => {
    const api: ApiFoodItem = {
      id: '1',
      name: 'X',
      price: '12.5',
      imageUrl: 'http://x',
      bgColor: '#fff',
    } as ApiFoodItem;
    const out = apiFoodItemToFoodItem(api);
    expect(out.price).toBe('$12.50');
    expect(out.image).toEqual({ uri: 'http://x' });
  });

  it('maps promo banner with formatting', () => {
    const api: ApiPromoBanner = {
      id: 'p1',
      title: 'T',
      subtitle: null,
      discount: 10,
      bgColor: null,
      foodName: 'F',
      foodPrice: '9.5',
      foodOriginalPrice: '12',
      foodRating: '4.0',
      foodDescription: 'd',
      imageUrl: 'http://img',
    } as ApiPromoBanner;
    const out = apiPromoBannerToPromoBannerItem(api);
    expect(out.price).toBe('$9.50');
    expect(out.originalPrice).toBe('$12.00');
    expect(out.image).toEqual({ uri: 'http://img' });
  });
});

import {
  apiFoodItemToFoodMenuItem,
  apiToppingToToppingOption,
} from '../mappers';
import type { ApiFoodItem, ApiToppingOption } from '@app-types/api';

describe('mappers', () => {
  it('maps API food item to FoodMenuItem correctly', () => {
    const apiItem: ApiFoodItem = {
      id: '1',
      name: 'Burger',
      price: '9.5',
      rating: '4.5',
      description: 'Tasty',
      longDescription: 'Very tasty',
      bgColor: '#FFF',
      imageUrl: 'https://example.com/a.png',
    } as unknown as ApiFoodItem;

    const result = apiFoodItemToFoodMenuItem(apiItem);

    expect(result.id).toBe('1');
    expect(result.name).toBe('Burger');
    expect(result.price).toBe('$9.50');
    expect(result.rating).toBe('4.5');
    expect(result.description).toBe('Tasty');
    expect(result.longDescription).toBe('Very tasty');
    expect(result.bgColor).toBe('#FFF');
    expect(result.image).toEqual({ uri: 'https://example.com/a.png' });
  });

  it('maps API topping option to ToppingOption correctly', () => {
    const apiTopping: ApiToppingOption = {
      label: 'Cheese',
      value: 'cheese',
      price: '1',
    } as unknown as ApiToppingOption;
    const result = apiToppingToToppingOption(apiTopping);

    expect(result.label).toBe('Cheese');
    expect(result.value).toBe('cheese');
    expect(result.price).toBe('$1.00');
  });
});

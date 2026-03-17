import type { FoodMenuItem, ToppingOption } from '../types';
import type { ApiFoodItem, ApiToppingOption } from '@app-types/api';

export const apiFoodItemToFoodMenuItem = (item: ApiFoodItem): FoodMenuItem => ({
  id: item.id,
  name: item.name,
  price: `$${parseFloat(item.price).toFixed(2)}`,
  rating: item.rating ?? '0.0',
  description: item.description ?? '',
  longDescription: item.longDescription ?? undefined,
  bgColor: item.bgColor ?? '#FFDECF',
  image: item.imageUrl ? { uri: item.imageUrl } : undefined,
});

export const apiToppingToToppingOption = (
  t: ApiToppingOption,
): ToppingOption => ({
  label: t.label,
  value: t.value,
  price: `$${parseFloat(t.price).toFixed(2)}`,
});

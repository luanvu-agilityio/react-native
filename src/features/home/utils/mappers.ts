import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';
import type { FoodItem, CategoryItem, PromoBannerItem } from '../types';
import type { ApiFoodItem, ApiCategory, ApiPromoBanner } from '@app-types/api';

// Icons
import SnacksIcon from '@icons/SnacksIcon';
import MealIcon from '@icons/MealIcon';
import VeganIcon from '@icons/VeganIcon';
import DessertIcon from '@icons/DessertIcon';
import DrinksIcon from '@icons/DrinksIcon';

const CATEGORY_ICON_MAP: Record<string, ComponentType<SvgProps>> = {
  snacks: SnacksIcon,
  meal: MealIcon,
  vegan: VeganIcon,
  dessert: DessertIcon,
  drinks: DrinksIcon,
};

export const apiCategoryToCategoryItem = (cat: ApiCategory): CategoryItem => ({
  key: cat.id,
  label: cat.label,
  Icon: CATEGORY_ICON_MAP[cat.id] ?? SnacksIcon,
});

export const apiFoodItemToFoodItem = (item: ApiFoodItem): FoodItem => ({
  id: item.id,
  name: item.name,
  price: `$${parseFloat(item.price).toFixed(2)}`,
  rating: item.rating ?? undefined,
  bgColor: item.bgColor ?? '#FFDECF',
  image: item.imageUrl ? { uri: item.imageUrl } : undefined,
  description: item.description ?? undefined,
});

export const apiPromoBannerToPromoBannerItem = (
  banner: ApiPromoBanner,
): PromoBannerItem => ({
  id: banner.id,
  title: banner.title,
  subtitle: banner.subtitle ?? '',
  discount: banner.discount ?? undefined,
  bgColor: banner.bgColor ?? '#E95322',
  foodName: banner.foodName ?? undefined,
  price: banner.foodPrice
    ? `$${parseFloat(banner.foodPrice).toFixed(2)}`
    : undefined,
  originalPrice: banner.foodOriginalPrice
    ? `$${parseFloat(banner.foodOriginalPrice).toFixed(2)}`
    : undefined,
  rating: banner.foodRating ?? undefined,
  description: banner.foodDescription ?? undefined,
  image: banner.imageUrl ? { uri: banner.imageUrl } : undefined,
});

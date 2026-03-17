import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';

export interface NavItem {
  key: string;
  label: string;
  Icon: ComponentType<SvgProps>;
}

export interface CategoryItem {
  key: string;
  label: string;
  Icon: ComponentType<SvgProps>;
}

export interface FoodItem {
  id: string;
  name: string;
  price: string;
  rating?: string;
  bgColor: string;
  image?: { uri: string };
  description?: string;
  Icon?: ComponentType<SvgProps>;
  isNew?: boolean;
}

export interface PromoBannerItem {
  id: string;
  title: string;
  subtitle: string;
  discount?: number;
  bgColor: string;
  foodName?: string;
  price?: string;
  originalPrice?: string;
  rating?: string;
  description?: string;
  image?: { uri: string } | ReturnType<typeof require>;
}

export interface GreetingConfig {
  title: string;
  subtitle: string;
}

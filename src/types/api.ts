import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AppStackParamList,
  HomeStackParamList,
  CheckoutStackParamList,
} from './navigation';

export interface ApiCategory {
  id: string;
  label: string;
  sortOrder: number;
}

export interface ApiFoodItem {
  id: string;
  categoryId: string;
  name: string;
  price: string;
  originalPrice: string | null;
  discount: number | null;
  rating: string | null;
  description: string | null;
  longDescription: string | null;
  bgColor: string | null;
  imageUrl: string | null;
  isBestSeller: boolean;
  isRecommended: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiToppingOption {
  id: string;
  label: string;
  value: string;
  price: string;
  sortOrder: number;
}

export interface ApiFoodItemDetail extends ApiFoodItem {
  toppings: ApiToppingOption[];
}

export interface ApiPromoBanner {
  id: string;
  title: string;
  subtitle: string | null;
  discount: number | null;
  bgColor: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;

  imageUrl: string | null;
  foodName: string | null;
  foodPrice: string | null;
  foodOriginalPrice: string | null;
  foodRating: string | null;
  foodDescription: string | null;
  foodBgColor: string | null;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
}

export interface ApiItemResponse<T> {
  data: T;
}

export type HomeNav = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  NativeStackNavigationProp<AppStackParamList>
>;

export type CheckoutNav = CompositeNavigationProp<
  NativeStackNavigationProp<CheckoutStackParamList>,
  NativeStackNavigationProp<AppStackParamList>
>;

export type Nav = HomeNav;

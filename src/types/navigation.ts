import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  SetFingerprint: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Profile: undefined;
  FoodMenu: { category?: string } | undefined;
  FoodDetail: {
    id: string;
    name: string;
    price: string;
    rating: string;
    description: string;
    longDescription?: string;
    bgColor: string;
    image?: string;
    discount?: number;
    originalPrice?: string;
  };
  BestSeller: undefined;
  Recommendations: undefined;
  ComingSoon: { fromKey?: string } | undefined;
};

export type CheckoutStackParamList = {
  ConfirmOrder: undefined;
  Payment: undefined;
  OrderConfirmed: { success: boolean };
  DeliveryTime: undefined;
};

export type AppStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList> | undefined;
  CheckoutStack: NavigatorScreenParams<CheckoutStackParamList> | undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type HomeScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

export type CheckoutScreenProps<T extends keyof CheckoutStackParamList> =
  NativeStackScreenProps<CheckoutStackParamList, T>;

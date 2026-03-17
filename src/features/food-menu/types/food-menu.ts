export interface FoodMenuItem {
  id: string;
  name: string;
  price: string;
  rating: string;
  description: string;
  longDescription?: string;
  bgColor: string;
  image?: { uri: string };
}

export interface ToppingOption {
  label: string;
  value: string;
  price: string;
}

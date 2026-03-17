import HomeIcon from '@icons/HomeIcon';
import type {
  NavItem,
  CategoryItem,
  FoodItem,
  PromoBannerItem,
  GreetingConfig,
} from '../types';
import FoodMenuIcon from '@icons/FoodMenuIcon';
import FavoriteIcon from '@icons/FavoriteIcon';
import OrderHistoryIcon from '@icons/OrderHistoryIcon';
import HelpIcon from '@icons/HelpIcon';
import SnacksIcon from '@icons/SnacksIcon';
import MealIcon from '@icons/MealIcon';
import VeganIcon from '@icons/VeganIcon';
import DessertIcon from '@icons/DessertIcon';
import DrinksIcon from '@icons/DrinksIcon';

export const ICON_SIZE = 32;

export const BANNER_BG_COLORS = ['#E95322', '#391713', '#252525'];

export const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'food-menu', label: 'Food Menu', Icon: FoodMenuIcon },
  { key: 'favorites', label: 'Favorites', Icon: FavoriteIcon },
  { key: 'orders', label: 'Orders', Icon: OrderHistoryIcon },
  { key: 'help', label: 'Help', Icon: HelpIcon },
];

export const CATEGORY_ITEMS: CategoryItem[] = [
  { key: 'snacks', label: 'Snacks', Icon: SnacksIcon },
  { key: 'meal', label: 'Meal', Icon: MealIcon },
  { key: 'vegan', label: 'Vegan', Icon: VeganIcon },
  { key: 'dessert', label: 'Dessert', Icon: DessertIcon },
  { key: 'drinks', label: 'Drinks', Icon: DrinksIcon },
];

export const BEST_SELLER_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Sushi Roll',
    price: '$103.0',
    rating: '5.0',
    bgColor: '#FFDECF',
    description:
      'Smoked salmon sushi roll with avocado and a special house sauce.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680056/smoked-salmon-sushi-roll-recipe-1739410610_m5guak.jpg',
    },
  },
  {
    id: '2',
    name: 'Fried Chicken',
    price: '$50.0',
    rating: '4.0',
    bgColor: '#FFE4B5',
    description:
      'Crispy, triple-dipped fried chicken served golden and delicious.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/AR-89268-triple-dipped-fried-chicken-beauty-2x1-2ece2beac2344ad68477c9ebd4c1f4d5_favcee.jpg',
    },
  },
  {
    id: '3',
    name: 'Pasta',
    price: '$12.99',
    rating: '4.0',
    bgColor: '#D4EDDA',
    description: 'Caramelized tomato paste pasta finished with fresh herbs.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/k_Photo_Recipes_2023-01-Caramelized-Tomato-Paste-Pasta_06-CARAMELIZED-TOMATO-PASTE-PASTA-039_pnici9.jpg',
    },
  },
  {
    id: '4',
    name: 'Berry Cake',
    price: '$8.20',
    rating: '5.0',
    bgColor: '#E8D5F5',
    description: 'Layered berry cake with vanilla cream — light and indulgent.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/Simply-Recipes-Berry-Chantilly-Cake-LEAD-6-3598d9645fba4f6e998e6f7a80a5fdaf_vjhuwr.jpg',
    },
  },
];

export const RECOMMENDED_ITEMS: FoodItem[] = [
  {
    id: '1',
    name: 'Burger',
    price: '$10.0',
    rating: '5.0',
    bgColor: '#FFDECF',
    description:
      'Thick and juicy cheeseburger topped with fresh lettuce and tomato.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/20250523-SEA-ThickandJuicyCheeseburgers-LorenaMasso-HERO-68563a45a4184a0e82c5a8b9f68a719d_qvnp1k.jpg',
    },
  },
  {
    id: '2',
    name: 'Spring Rolls',
    price: '$25.0',
    rating: '5.0',
    bgColor: '#D4EDDA',
    description:
      'Crispy spring rolls filled with fresh vegetables and served with a sweet chili dip.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/Crispy-spring-rolls_raimxn.jpg',
    },
  },
  {
    id: '3',
    name: 'Pizza',
    price: '$15.0',
    rating: '4.8',
    bgColor: '#FFE4B5',
    description: 'Classic tomato and mozzarella pizza with fresh basil.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/tomato-mozzarella-pizza-FT-RECIPE0725-e7244e979c504188a049623668c15b2e_xvtjdc.jpg',
    },
  },
  {
    id: '4',
    name: 'Noodles',
    price: '$9.5',
    rating: '4.7',
    bgColor: '#E8D5F5',
    description:
      'Savory roasted-duck noodles served in a rich flavorful sauce.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/pngtree-roasted-duck-nooddle-with-sauce-image_16126724_vagoka.jpg',
    },
  },
];

export const PROMO_BANNERS: PromoBannerItem[] = [
  {
    id: '1',
    title: 'Experience our delicious new dish',
    subtitle: '',
    discount: 30,
    bgColor: '#E95322',
    foodName: 'Sushi Roll Special',
    price: '$73.0',
    originalPrice: '$103.0',
    rating: '4.9',
    description:
      'Our signature sushi roll with fresh salmon, avocado and a special house sauce. A must-try for sushi lovers.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680056/smoked-salmon-sushi-roll-recipe-1739410610_m5guak.jpg',
    },
  },
  {
    id: '2',
    title: 'Try our special weekend deal',
    subtitle: '',
    discount: 20,
    bgColor: '#391713',
    foodName: 'Fried Chicken Combo',
    price: '$40.0',
    originalPrice: '$50.0',
    rating: '4.7',
    description:
      'Crispy golden fried chicken with our secret blend of spices. Served with fries and a dipping sauce.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/AR-89268-triple-dipped-fried-chicken-beauty-2x1-2ece2beac2344ad68477c9ebd4c1f4d5_favcee.jpg',
    },
  },
  {
    id: '3',
    title: 'Free delivery on orders over $30',
    subtitle: '',
    bgColor: '#252525',
    foodName: 'Berry Cake Delight',
    price: '$8.20',
    originalPrice: '$8.20',
    rating: '4.8',
    description:
      'A heavenly mix of fresh berries layered on a soft sponge cake with vanilla cream. Perfect for dessert.',
    image: {
      uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/Simply-Recipes-Berry-Chantilly-Cake-LEAD-6-3598d9645fba4f6e998e6f7a80a5fdaf_vjhuwr.jpg',
    },
  },
];

export const PORTION_OPTIONS = [
  { label: 'Personal (4 Slides)', value: 'personal', price: '$0.00' },
  { label: 'Medium (8 Slides)', value: 'medium', price: '$3.00' },
  { label: 'Familiar (10 Slides)', value: 'familiar', price: '$6.00' },
  { label: 'Jumbo (12 Slides)', value: 'jumbo', price: '$10.00' },
];

export const GREETING_MAP: Record<string, GreetingConfig> = {
  morning: {
    title: 'Good Morning',
    subtitle: "Rise And Shine! It's Breakfast Time",
  },
  afternoon: { title: 'Good Afternoon', subtitle: "Fuel Up! It's Lunch Time" },
  evening: { title: 'Good Evening', subtitle: 'Wind Down With A Tasty Dinner' },
  night: { title: 'Good Night', subtitle: 'A Late Night Snack Perhaps?' },
};

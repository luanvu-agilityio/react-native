// Types
import type { FoodMenuItem } from '../types';

// Icons
import SnacksIcon from '@icons/SnacksIcon';
import MealIcon from '@icons/MealIcon';
import VeganIcon from '@icons/VeganIcon';
import DessertIcon from '@icons/DessertIcon';
import DrinksIcon from '@icons/DrinksIcon';

export const FOOD_MENU_ITEMS: Record<string, FoodMenuItem[]> = {
  snacks: [
    {
      id: '1',
      name: 'Mexican Appetizer',
      price: '$15.00',
      rating: '5.0',
      description: 'Tortilla Chips With Toppins',
      longDescription:
        'Crispy tortilla chips served with a trio of house-made salsas and a creamy avocado dip. Perfect for sharing or as a flavorful starter to your meal.',
      bgColor: '#FFE4B5',
      image: {
        uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680054/Skillet-Nachos_EXPS_TOHD24_133666_AlejandroMonfort_5_pnehvh.jpg',
      },
    },
    {
      id: '2',
      name: 'Pork Skewer',
      price: '$12.99',
      rating: '4.0',
      description:
        'Marinated in a rich blend of herbs and spices, then grilled to perfection, served with a side of zesty dipping sauce.',
      longDescription:
        'Tender pork skewers marinated overnight in a savory mix of garlic, lime, and chili, flame-grilled and finished with a tangy herb sauce. Served with fresh lemon wedges.',
      bgColor: '#FFDECF',
      image: {
        uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2019__07__20190618-grilled-thai-pork-skewers-vicky-wasik-13-8b3614c8f6234187abf1396973a4eeea_buce3d.jpg',
      },
    },
    {
      id: '3',
      name: 'Spring Rolls',
      price: '$9.50',
      rating: '4.5',
      description:
        'Crispy golden rolls filled with fresh vegetables and glass noodles.',
      longDescription:
        'Light and crunchy spring rolls packed with julienned vegetables, glass noodles, and aromatic herbs. Served with a sweet chili dipping sauce for a perfect balance.',
      bgColor: '#D4EDDA',
      image: {
        uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/Crispy-spring-rolls_raimxn.jpg',
      },
    },
    {
      id: '4',
      name: 'Nachos Supreme',
      price: '$11.00',
      rating: '4.8',
      description: 'Loaded with cheese, jalapeños, salsa, and sour cream.',
      longDescription:
        'A generous plate of tortilla chips layered with melted cheese, pickled jalapeños, seasoned beans, fresh pico de gallo, and a dollop of sour cream. Ideal for sharing.',
      bgColor: '#FFF3CD',
      image: {
        uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680055/Nachos-Supreme-13-Edit_hly88s.jpg',
      },
    },
  ],
  meal: [
    {
      id: '5',
      name: 'Grilled Salmon',
      price: '$24.00',
      rating: '5.0',
      description: 'Fresh Atlantic salmon grilled with lemon butter sauce.',
      longDescription:
        'Fresh Atlantic salmon fillet grilled to flaky perfection, glazed with a silky lemon-butter sauce and served with seasonal roasted vegetables and herbed potatoes.',
      bgColor: '#FFDECF',
      image: {
        uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680054/how-to-grill-salmon-2216658-hero-01-a9c948f8a238400ebaafc0caf509c7fa_sqciyv.jpg',
      },
    },
    {
      id: '6',
      name: 'Chicken Pasta',
      price: '$18.00',
      rating: '4.6',
      description: 'Creamy Alfredo pasta with grilled chicken and parmesan.',
      longDescription:
        'Al dente pasta tossed in a rich Alfredo sauce, topped with grilled chicken breast, shaved parmesan, and a sprinkle of fresh parsley for brightness.',
      bgColor: '#E8D5F5',
      image: {
        uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680054/One-Pan-Chicken-Pasta-Romano-4x3-1-2000-8de21961bb3a4a5abd6eaa3c9c7668df_bpng16.jpg',
      },
    },
  ],
  vegan: [
    {
      id: '7',
      name: 'Buddha Bowl',
      price: '$14.00',
      rating: '4.9',
      description: 'Quinoa, roasted vegetables, avocado, and tahini dressing.',
      longDescription:
        'A nourishing bowl of tri-color quinoa, roasted seasonal vegetables, creamy avocado, pickled red cabbage, and a zesty tahini-lemon dressing. Packed with nutrients and flavor.',
      bgColor: '#D4EDDA',
      image: {
        uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
      },
    },
  ],
  dessert: [
    {
      id: '8',
      name: 'Berry Cheesecake',
      price: '$8.50',
      rating: '5.0',
      description:
        'Classic New York cheesecake topped with mixed berry compote.',
      longDescription:
        'Creamy New York-style cheesecake on a buttery graham crust, crowned with a house-made mixed berry compote and a light dusting of citrus zest.',
      bgColor: '#E8D5F5',
      image: {
        uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680054/warm-roasted-vegetable-quinoa-salad-1-1_mapg9r.jpg',
      },
    },
  ],
  drinks: [
    {
      id: '9',
      name: 'Mango Smoothie',
      price: '$6.00',
      rating: '4.7',
      description: 'Blended fresh mango, banana, and coconut milk.',
      longDescription:
        'A creamy smoothie made with ripe mangoes, banana, and coconut milk, blended until silky smooth and served chilled for a refreshing treat.',
      bgColor: '#FFE4B5',
      image: {
        uri: 'https://res.cloudinary.com/dhxpzzz5a/image/upload/v1772680054/tropical-mango-smoothie-vegan-2_vnbnaz.jpg',
      },
    },
  ],
};

export const SORT_OPTIONS = ['Popular', 'Newest', 'Price: Low-High', 'Rating'];

export const TOPPING_OPTIONS = [
  { label: 'Guacamole', value: 'guacamole', price: '$2.99' },
  { label: 'Jalapeños', value: 'jalapenos', price: '$3.99' },
  { label: 'Ground Beef', value: 'ground-beef', price: '$3.99' },
  { label: 'Pico de Gallo', value: 'pico-de-gallo', price: '$2.99' },
];

export const CATEGORY_KEYS = [
  'snacks',
  'meal',
  'vegan',
  'dessert',
  'drinks',
] as const;

export const CATEGORY_ITEMS = [
  { key: 'snacks', label: 'Snacks', Icon: SnacksIcon },
  { key: 'meal', label: 'Meal', Icon: MealIcon },
  { key: 'vegan', label: 'Vegan', Icon: VeganIcon },
  { key: 'dessert', label: 'Dessert', Icon: DessertIcon },
  { key: 'drinks', label: 'Drinks', Icon: DrinksIcon },
];

export const ICON_SIZE = 32;
export const ICON_COLOR = '#E95322';

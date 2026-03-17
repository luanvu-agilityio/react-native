import FavoriteIcon from '@icons/FavoriteIcon';
import FoodMenuIcon from '@icons/FoodMenuIcon';
import HelpIcon from '@icons/HelpIcon';
import HomeIcon from '@icons/HomeIcon';
import OrderHistoryIcon from '@icons/OrderHistoryIcon';

export const ICON_SIZE = 24;
export const ICON_COLOR = '#ffffff';

export const ITEM_BASE_CLASS = 'items-center justify-between';
export const ITEM_ACTIVE_CLASS = 'opacity-100';
export const ITEM_INACTIVE_CLASS = 'opacity-60';

export const ACTIVE_INDICATOR_CLASS =
  'absolute bottom-2 w-1 h-1 rounded-full bg-white';

export const NAV_ITEMS = [
  {
    key: 'home',
    label: 'Home',
    icon: HomeIcon,
    screen: 'Home',
    params: undefined,
  },
  {
    key: 'food',
    label: 'Food Menu',
    icon: FoodMenuIcon,
    screen: 'FoodMenu',
    params: undefined,
  },
  {
    key: 'favorites',
    label: 'Favorites',
    icon: FavoriteIcon,
    screen: 'ComingSoon',
    params: { fromKey: 'favorites' },
  },
  {
    key: 'orders',
    label: 'Orders',
    icon: OrderHistoryIcon,
    screen: 'ComingSoon',
    params: { fromKey: 'orders' },
  },
  {
    key: 'support',
    label: 'Support',
    icon: HelpIcon,
    screen: 'ComingSoon',
    params: { fromKey: 'support' },
  },
] as const;

import BagIcon from '@icons/BagIcon';
import AddressIcon from '@icons/AddressIcon';
import ContactIcon from '@icons/ContactIcon';
import ChatIcon from '@icons/ChatIcon';
import SettingIcon from '@icons/SettingIcon';
import LogoutIcon from '@icons/LogoutIcon';
import ProfileIcon from '@icons/ProfileIcon';
import CardIcon from '@icons/CardIcon';

export const PROFILE_MENU_ITEMS = [
  {
    key: 'orders',
    Icon: BagIcon,
    iconProps: { width: 22, height: 26 },
    label: 'My Orders',
    disabled: true,
  },
  {
    key: 'profile',
    Icon: ProfileIcon,
    iconProps: { width: 22, height: 26 },
    label: 'My Profile',
    disabled: true,
  },
  {
    key: 'address',
    Icon: AddressIcon,
    iconProps: { width: 22, height: 26 },
    label: 'Delivery Address',
    disabled: true,
  },
  {
    key: 'payments',
    Icon: CardIcon,
    iconProps: { width: 22, height: 26 },
    label: 'Payment Methods',
    disabled: true,
  },
  {
    key: 'contact',
    Icon: ContactIcon,
    iconProps: { width: 22, height: 26 },
    label: 'Contact Us',
    disabled: true,
  },
  {
    key: 'help',
    Icon: ChatIcon,
    iconProps: { width: 22, height: 26 },
    label: 'Help & FAQs',
    disabled: true,
  },
  {
    key: 'settings',
    Icon: SettingIcon,
    iconProps: { width: 20, height: 20 },
    label: 'Settings',
    disabled: true,
  },
];

export const PROFILE_LOGOUT_ITEM = {
  key: 'logout',
  Icon: LogoutIcon,
  iconProps: { width: 22, height: 26 },
  label: 'Log Out',
};

export default PROFILE_MENU_ITEMS;

import * as React from 'react';
import { render } from '@testing-library/react-native';

import FavoriteIcon from '../FavoriteIcon';
import FoodMenuIcon from '../FoodMenuIcon';
import HelpIcon from '../HelpIcon';
import HomeIcon from '../HomeIcon';
import StarIcon from '../StarIcon';
import GoogleIcon from '../GoogleIcon';
import FacebookIcon from '../FacebookIcon';
import EyesOnIcon from '../EyesOnIcon';
import EyesOffIcon from '../EyesOffIcon';
import OrderHistoryIcon from '../OrderHistoryIcon';
import FilterIcon from '@icons/FilterIcon';
import CardIcon from '@icons/CardIcon';
import DeliveryIcon from '@icons/DeliveryIcon';
import DessertIcon from '@icons/DessertIcon';
import DrinksIcon from '@icons/DrinksIcon';
import LargeFingerprintIcon from '@icons/LargeFingerprintIcon';
import MealIcon from '@icons/MealIcon';
import SnacksIcon from '@icons/SnacksIcon';
import VeganIcon from '@icons/VeganIcon';
import YumQuickIcon from '@icons/YumQuickIcon';
import AddressIcon from '@icons/AddressIcon';
import BagIcon from '@icons/BagIcon';
import ChatIcon from '@icons/ChatIcon';
import ContactIcon from '@icons/ContactIcon';
import LogoutIcon from '@icons/LogoutIcon';
import SettingIcon from '@icons/SettingIcon';

describe('Icons', () => {
  it('renders icons and accepts props', () => {
    const icons: Array<React.ReactElement> = [
      <AddressIcon />,
      <BagIcon />,
      <ChatIcon />,
      <ContactIcon />,
      <LogoutIcon />,
      <SettingIcon />,
      <FavoriteIcon key="fav" color="#123456" />,
      <FoodMenuIcon key="food" width={24} height={24} />,
      <HelpIcon key="help" color="#000" />,
      <HomeIcon key="home" />,
      <StarIcon key="star" />,
      <FilterIcon />,
      <GoogleIcon key="google" />,
      <FacebookIcon key="fb" />,
      <EyesOnIcon key="eyesOn" />,
      <EyesOffIcon key="eyesOff" />,
      <OrderHistoryIcon key="order" />,
      <CardIcon />,
      <DeliveryIcon />,
      <DessertIcon />,
      <DrinksIcon />,
      <LargeFingerprintIcon />,
      <MealIcon />,
      <SnacksIcon />,
      <VeganIcon />,
      <YumQuickIcon />,
    ];

    icons.forEach(icon => {
      const { toJSON } = render(icon);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});

import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  return {
    createNativeStackNavigator: () => {
      const { View } = require('react-native');
      const Navigator = ({ children }: { children: React.ReactNode }) =>
        React.createElement(View, { testID: 'mock-checkout-stack' }, children);
      const Screen = () => null;
      return { Navigator, Screen };
    },
  };
});

jest.mock('@features/cart', () => ({
  ConfirmOrderScreen: () => null,
  PaymentScreen: () => null,
  OrderConfirmedScreen: () => null,
  DeliveryTimeScreen: () => null,
}));

import CheckoutNavigator from '../CheckoutNavigator';

describe('CheckoutNavigator', () => {
  it('exports a component', () => {
    expect(typeof CheckoutNavigator).toBe('function');
  });

  it('renders the checkout stack navigator', () => {
    const { getByTestId } = render(<CheckoutNavigator />);
    expect(getByTestId('mock-checkout-stack')).toBeTruthy();
  });
});

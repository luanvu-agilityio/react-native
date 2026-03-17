import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');
  return {
    createNativeStackNavigator: () => {
      const { View } = require('react-native');
      const Navigator = ({ children }: { children: React.ReactNode }) =>
        React.createElement(View, { testID: 'mock-home-stack' }, children);
      const Screen = () => null;
      return { Navigator, Screen };
    },
  };
});

jest.mock('@features/home', () => ({
  HomeScreen: () => null,
  BestSellerScreen: () => null,
  RecommendationsScreen: () => null,
  ComingSoonScreen: () => null,
}));

jest.mock('@features/food-menu', () => ({
  FoodMenuScreen: () => null,
  FoodDetailScreen: () => null,
}));

jest.mock('@features/profile', () => ({
  ProfileScreen: () => null,
}));

import HomeNavigator from '../HomeNavigator';

describe('HomeNavigator', () => {
  it('exports a component', () => {
    expect(typeof HomeNavigator).toBe('function');
  });

  it('renders the home stack navigator', () => {
    const { getByTestId } = render(<HomeNavigator />);
    expect(getByTestId('mock-home-stack')).toBeTruthy();
  });
});

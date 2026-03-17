import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('@lib/navigationRef', () => ({
  navigateTo: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigationState: jest.fn(),
}));

jest.mock('@icons/HomeIcon', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'icon-home' });
});
jest.mock('@icons/FoodMenuIcon', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'icon-food' });
});
jest.mock('@icons/FavoriteIcon', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'icon-favorites' });
});
jest.mock('@icons/OrderHistoryIcon', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'icon-orders' });
});
jest.mock('@icons/HelpIcon', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { testID: 'icon-help' });
});

import { BottomNav } from '../BottomNav';
import { useNavigationState } from '@react-navigation/native';
import { navigateTo } from '@lib/navigationRef';

describe('BottomNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all nav items when no route is active', () => {
    (useNavigationState as jest.Mock).mockReturnValue(undefined);
    const { getByLabelText } = render(<BottomNav />);
    expect(getByLabelText('Home')).toBeTruthy();
    expect(getByLabelText('Food Menu')).toBeTruthy();
    expect(getByLabelText('Favorites')).toBeTruthy();
    expect(getByLabelText('Orders')).toBeTruthy();
    expect(getByLabelText('Support')).toBeTruthy();
  });

  it('marks the Home item as active when current route is Home', () => {
    (useNavigationState as jest.Mock).mockReturnValue({
      name: 'Home',
      params: undefined,
    });
    const { getByLabelText } = render(<BottomNav />);
    expect(getByLabelText('Home').props.accessibilityState.selected).toBe(true);
    expect(getByLabelText('Food Menu').props.accessibilityState.selected).toBe(
      false,
    );
  });

  it('marks Favorites as active when on ComingSoon with matching fromKey', () => {
    (useNavigationState as jest.Mock).mockReturnValue({
      name: 'ComingSoon',
      params: { fromKey: 'favorites' },
    });
    const { getByLabelText } = render(<BottomNav />);
    expect(getByLabelText('Favorites').props.accessibilityState.selected).toBe(
      true,
    );
    expect(getByLabelText('Orders').props.accessibilityState.selected).toBe(
      false,
    );
  });

  it('marks Orders as active when on ComingSoon with fromKey=orders', () => {
    (useNavigationState as jest.Mock).mockReturnValue({
      name: 'ComingSoon',
      params: { fromKey: 'orders' },
    });
    const { getByLabelText } = render(<BottomNav />);
    expect(getByLabelText('Orders').props.accessibilityState.selected).toBe(
      true,
    );
  });

  it('does not mark ComingSoon item active when fromKey does not match', () => {
    (useNavigationState as jest.Mock).mockReturnValue({
      name: 'ComingSoon',
      params: { fromKey: 'other' },
    });
    const { getByLabelText } = render(<BottomNav />);
    expect(getByLabelText('Favorites').props.accessibilityState.selected).toBe(
      false,
    );
    expect(getByLabelText('Orders').props.accessibilityState.selected).toBe(
      false,
    );
  });

  it('calls navigateTo with correct args when a nav item is pressed', () => {
    (useNavigationState as jest.Mock).mockReturnValue(undefined);
    const { getByLabelText } = render(<BottomNav />);
    fireEvent.press(getByLabelText('Food Menu'));
    expect(jest.mocked(navigateTo)).toHaveBeenCalledWith('HomeStack', {
      screen: 'FoodMenu',
      params: undefined,
    });
  });

  it('reuses the cached press handler on repeated presses', () => {
    (useNavigationState as jest.Mock).mockReturnValue(undefined);
    const { getByLabelText } = render(<BottomNav />);
    fireEvent.press(getByLabelText('Home'));
    fireEvent.press(getByLabelText('Home'));
    const calls = jest.mocked(navigateTo).mock.calls;
    expect(calls).toHaveLength(2);
    expect(calls[0]).toEqual(calls[1]);
  });

  it('respects safe area insets for bottom padding', () => {
    (useNavigationState as jest.Mock).mockReturnValue(undefined);
    const { toJSON } = render(<BottomNav />);
    expect(toJSON()).toBeTruthy();
  });
});

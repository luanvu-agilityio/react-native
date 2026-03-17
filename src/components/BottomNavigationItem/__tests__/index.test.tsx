import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View } from 'react-native';
import { BottomNavigationItem } from '../index';

const mockOnPress = jest.fn();

const MockIcon = () => <View accessibilityLabel="mock-icon" />;

const DEFAULT_PROPS = {
  icon: <MockIcon />,
  label: 'Home',
  onPress: mockOnPress,
};

beforeEach(() => {
  mockOnPress.mockClear();
});

describe('BottomNavigationItem', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<BottomNavigationItem {...DEFAULT_PROPS} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders the icon', () => {
    const { UNSAFE_queryByProps } = render(
      <BottomNavigationItem {...DEFAULT_PROPS} />,
    );
    expect(
      UNSAFE_queryByProps({ accessibilityLabel: 'mock-icon' }),
    ).toBeTruthy();
  });

  it('has accessibilityRole tab', () => {
    const { getByRole } = render(<BottomNavigationItem {...DEFAULT_PROPS} />);
    expect(getByRole('tab')).toBeTruthy();
  });

  it('uses label as accessibilityLabel', () => {
    const { getByLabelText } = render(
      <BottomNavigationItem {...DEFAULT_PROPS} label="Food Menu" />,
    );
    expect(getByLabelText('Food Menu')).toBeTruthy();
  });

  it('sets accessibilityState.selected to true when active', () => {
    const { getByRole } = render(
      <BottomNavigationItem {...DEFAULT_PROPS} active />,
    );
    expect(getByRole('tab').props.accessibilityState.selected).toBe(true);
  });

  it('sets accessibilityState.selected to false when inactive', () => {
    const { getByRole } = render(
      <BottomNavigationItem {...DEFAULT_PROPS} active={false} />,
    );
    expect(getByRole('tab').props.accessibilityState.selected).toBe(false);
  });

  it('calls onPress when pressed', () => {
    const { getByRole } = render(<BottomNavigationItem {...DEFAULT_PROPS} />);
    fireEvent.press(getByRole('tab'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it.skip('applies active opacity class when active', () => {
    const { getByRole } = render(
      <BottomNavigationItem {...DEFAULT_PROPS} active />,
    );
    const tabElement = getByRole('tab');
    const className =
      tabElement.props.className || tabElement.props.class || '';
    expect(className).toContain('opacity-100');
  });

  it.skip('applies inactive opacity class when not active', () => {
    const { getByRole } = render(
      <BottomNavigationItem {...DEFAULT_PROPS} active={false} />,
    );
    const tabElement = getByRole('tab');
    const className =
      tabElement.props.className || tabElement.props.class || '';
    expect(className).toContain('opacity-60');
  });
});

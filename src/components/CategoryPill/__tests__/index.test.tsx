import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CategoryPill } from '../index';

const MockIcon = () => null;

describe('CategoryPill', () => {
  it('renders simple variant and calls onPress with itemKey', () => {
    const onPress = jest.fn();
    const { getByRole, getByText } = render(
      <CategoryPill
        itemKey="k1"
        label="Label"
        Icon={MockIcon}
        isActive={true}
        onPress={onPress}
        variant="simple"
      />,
    );

    const tab = getByRole('tab', { name: 'Label' });
    fireEvent.press(tab);
    expect(onPress).toHaveBeenCalledWith('k1');
    expect(getByText('Label')).toBeTruthy();
  });

  it('renders pill variant active and inactive', () => {
    const onPress = jest.fn();
    const { getByRole, rerender } = render(
      <CategoryPill
        itemKey="k2"
        label="Pill"
        Icon={MockIcon}
        isActive={true}
        onPress={onPress}
      />,
    );

    const active = getByRole('tab', { name: 'Pill' });
    expect(active.props.accessibilityState.selected).toBe(true);

    rerender(
      <CategoryPill
        itemKey="k2"
        label="Pill"
        Icon={MockIcon}
        isActive={false}
        onPress={onPress}
      />,
    );

    const inactive = getByRole('tab', { name: 'Pill' });
    expect(inactive.props.accessibilityState.selected).toBe(false);
  });
});

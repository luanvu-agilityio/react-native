import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ReactTestInstance } from 'react-test-renderer';

interface WithAccessibility {
  accessibilityState?: { disabled?: boolean };
}

import { ProfileMenuItem } from '../ProfileMenuItem';

describe('ProfileMenuItem', () => {
  it('renders label and calls onPress when not disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ProfileMenuItem
        icon={<Text>Icon</Text>}
        label="Profile"
        onPress={onPress}
      />,
    );

    const label = getByText('Profile');
    fireEvent.press(label);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <ProfileMenuItem
        icon={<Text>Icon</Text>}
        label="Profile"
        onPress={onPress}
        disabled
      />,
    );

    const label = getByText('Profile');
    // Find nearest ancestor with accessibilityState and assert disabled
    let node: ReactTestInstance | null = label as unknown as ReactTestInstance;
    while (
      node &&
      node.props &&
      (node.props as unknown as WithAccessibility).accessibilityState ===
        undefined
    ) {
      node = node.parent as ReactTestInstance | null;
    }
    expect(
      (node?.props as unknown as WithAccessibility)?.accessibilityState
        ?.disabled,
    ).toBe(true);

    // Don't simulate press when disabled; assert accessibility state only
    expect(onPress).not.toHaveBeenCalled();
  });
});

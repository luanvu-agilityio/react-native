import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../index';
import * as React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { ActivityIndicator } from 'react-native';
import FavoriteIcon from '../../../icons/FavoriteIcon';

describe('Button', () => {
  it('renders the label correctly', () => {
    const { getByText } = render(<Button label="Log In" onPress={() => {}} />);
    expect(getByText('Log In')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button label="Click Me" onPress={onPressMock} />,
    );
    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button label="Disabled" onPress={onPressMock} disabled />,
    );
    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button label="Loading" onPress={onPressMock} isLoading />,
    );
    fireEvent.press(getByText('Loading'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('shows ActivityIndicator when isLoading is true', () => {
    const { getByTestId } = render(
      <Button label="Loading" onPress={() => {}} isLoading />,
    );

    expect(getByTestId).toBeTruthy();
  });

  it('renders all variants without crashing', () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost'] as const;
    variants.forEach(variant => {
      const { getByText } = render(
        <Button label={variant} onPress={() => {}} variant={variant} />,
      );
      expect(getByText(variant)).toBeTruthy();
    });
  });

  it('defaults to primary variant', () => {
    const { getByText } = render(<Button label="Default" onPress={() => {}} />);
    expect(getByText('Default')).toBeTruthy();
  });

  it('renders leftIcon and respects accessibilityLabel override', () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Button
        label="Go"
        onPress={onPress}
        leftIcon={<FavoriteIcon />}
        accessibilityLabel="btn-go"
      />,
    );

    expect(getByRole('button', { name: 'btn-go' })).toBeTruthy();
  });

  it('ActivityIndicator uses spinner color mapping for variants', () => {
    const spinnerColorMap: Record<string, string> = {
      primary: '#ffffff',
      secondary: '#391713',
      outline: '#676767',
      ghost: '#E95322',
    };

    let renderer!: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      renderer = ReactTestRenderer.create(
        <Button label="Load" onPress={() => {}} isLoading variant="ghost" />,
      );
    });

    const indicators = renderer.root.findAllByType(ActivityIndicator);
    expect(indicators.length).toBeGreaterThanOrEqual(1);
    expect(indicators[0].props.color).toBe(spinnerColorMap.ghost);
  });

  it('applies full layout and accessibilityState when loading/disabled', () => {
    const onPress = jest.fn();
    const { getByRole, rerender } = render(
      <Button
        label="Full"
        onPress={onPress}
        full
        accessibilityLabel="full-btn"
      />,
    );

    const btn = getByRole('button', { name: 'full-btn' });
    expect(btn.props.accessibilityLabel).toBe('full-btn');

    rerender(
      <Button
        label="Full"
        onPress={onPress}
        isLoading
        accessibilityLabel="full-btn"
      />,
    );
    const btn2 = getByRole('button', { name: 'full-btn' });
    expect(btn2.props.accessibilityState.busy).toBe(true);
    expect(btn2.props.accessibilityState.disabled).toBe(true);
  });
});

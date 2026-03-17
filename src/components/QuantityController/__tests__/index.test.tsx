import { render, fireEvent } from '@testing-library/react-native';
import { QuantityController } from '../index';

const mockOnChange = jest.fn();

const DEFAULT_PROPS = {
  value: 1,
  onChange: mockOnChange,
};

beforeEach(() => {
  mockOnChange.mockClear();
});

describe('QuantityController', () => {
  it('calls onChange with incremented value when + is pressed', () => {
    const { getByRole } = render(
      <QuantityController {...DEFAULT_PROPS} value={2} />,
    );
    fireEvent.press(getByRole('button', { name: 'Increase quantity' }));
    expect(mockOnChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with decremented value when - is pressed', () => {
    const { getByRole } = render(
      <QuantityController {...DEFAULT_PROPS} value={2} />,
    );
    fireEvent.press(getByRole('button', { name: 'Decrease quantity' }));
    expect(mockOnChange).toHaveBeenCalledWith(1);
  });

  it('does not decrement below min', () => {
    const { getByRole } = render(
      <QuantityController {...DEFAULT_PROPS} value={0} min={0} />,
    );
    fireEvent.press(getByRole('button', { name: 'Decrease quantity' }));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('does not increment above max', () => {
    const { getByRole } = render(
      <QuantityController {...DEFAULT_PROPS} value={5} max={5} />,
    );
    fireEvent.press(getByRole('button', { name: 'Increase quantity' }));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('respects step value', () => {
    const { getByRole } = render(
      <QuantityController {...DEFAULT_PROPS} value={0} step={5} />,
    );
    fireEvent.press(getByRole('button', { name: 'Increase quantity' }));
    expect(mockOnChange).toHaveBeenCalledWith(5);
  });

  it('disables both buttons when disabled prop is true', () => {
    const { getByRole } = render(
      <QuantityController {...DEFAULT_PROPS} disabled />,
    );
    expect(
      getByRole('button', { name: 'Decrease quantity' }).props
        .accessibilityState.disabled,
    ).toBe(true);
    expect(
      getByRole('button', { name: 'Increase quantity' }).props
        .accessibilityState.disabled,
    ).toBe(true);
  });

  it('has correct accessibility role and value', () => {
    const { getByRole } = render(
      <QuantityController {...DEFAULT_PROPS} value={2} min={0} max={10} />,
    );
    const container = getByRole('adjustable');
    expect(container.props.accessibilityRole).toBe('adjustable');
    expect(container.props.accessibilityValue).toEqual({
      min: 0,
      max: 10,
      now: 2,
    });
  });
});

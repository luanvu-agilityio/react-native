import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RadioController } from '../index';

const OPTIONS = [
  { label: 'Guacamole', value: 'guacamole', price: '$2.99' },
  { label: 'Jalapeños', value: 'jalapenos', price: '$3.99' },
  { label: 'Sour Cream', value: 'sour-cream', price: '$1.99' },
];

const mockOnChange = jest.fn();

beforeEach(() => {
  mockOnChange.mockClear();
});

describe('RadioController', () => {
  it('renders all options', () => {
    const { getByText } = render(
      <RadioController options={OPTIONS} value="" onChange={mockOnChange} />,
    );
    OPTIONS.forEach(o => expect(getByText(o.label)).toBeTruthy());
  });

  it('renders prices when provided', () => {
    const { getByText } = render(
      <RadioController options={OPTIONS} value="" onChange={mockOnChange} />,
    );
    OPTIONS.forEach(o => o.price && expect(getByText(o.price)).toBeTruthy());
  });

  it('calls onChange with correct value when an option is pressed', () => {
    const { getByRole } = render(
      <RadioController options={OPTIONS} value="" onChange={mockOnChange} />,
    );
    fireEvent.press(getByRole('radio', { name: 'Jalapeños, $3.99' }));
    expect(mockOnChange).toHaveBeenCalledWith('jalapenos');
  });

  it('marks the selected option as checked', () => {
    const { getByRole } = render(
      <RadioController
        options={OPTIONS}
        value="guacamole"
        onChange={mockOnChange}
      />,
    );
    expect(
      getByRole('radio', { name: 'Guacamole, $2.99' }).props.accessibilityState
        .checked,
    ).toBe(true);
    expect(
      getByRole('radio', { name: 'Jalapeños, $3.99' }).props.accessibilityState
        .checked,
    ).toBe(false);
  });

  it('does not call onChange when disabled', () => {
    const { getByRole } = render(
      <RadioController
        options={OPTIONS}
        value=""
        onChange={mockOnChange}
        disabled
      />,
    );
    fireEvent.press(getByRole('radio', { name: 'Guacamole, $2.99' }));
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('has correct accessibility roles', () => {
    const { getByRole } = render(
      <RadioController
        options={OPTIONS}
        value="guacamole"
        onChange={mockOnChange}
      />,
    );
    expect(getByRole('radiogroup').props.accessibilityRole).toBe('radiogroup');
    expect(
      getByRole('radio', { name: 'Guacamole, $2.99' }).props.accessibilityRole,
    ).toBe('radio');
  });
});

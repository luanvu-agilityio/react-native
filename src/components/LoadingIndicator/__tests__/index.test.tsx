import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingIndicator } from '../index';

describe('LoadingIndicator', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<LoadingIndicator />);
    expect(toJSON()).toBeTruthy();
  });

  it('has accessibilityRole progressbar', () => {
    const { getByLabelText } = render(<LoadingIndicator />);
    expect(getByLabelText('Loading').props.accessibilityRole).toBe(
      'progressbar',
    );
  });

  it('uses message as accessibilityLabel when provided', () => {
    const { getByLabelText } = render(
      <LoadingIndicator message="Please wait" />,
    );
    expect(getByLabelText('Please wait').props.accessibilityRole).toBe(
      'progressbar',
    );
  });

  it('defaults to accessibilityLabel "Loading" when no message', () => {
    const { getByLabelText } = render(<LoadingIndicator />);
    expect(getByLabelText('Loading').props.accessibilityLabel).toBe('Loading');
  });

  it('renders message text when provided', () => {
    const { getByText } = render(
      <LoadingIndicator message="Loading data..." />,
    );
    expect(getByText('Loading data...')).toBeTruthy();
  });

  it('does not render message text when omitted', () => {
    const { queryByText } = render(<LoadingIndicator />);
    expect(queryByText('Loading')).toBeNull();
  });

  it('renders overlay container when overlay is true', () => {
    const { UNSAFE_getByProps } = render(<LoadingIndicator overlay />);
    expect(UNSAFE_getByProps({ accessibilityViewIsModal: true })).toBeTruthy();
  });

  it('does not render overlay container when overlay is false', () => {
    const { UNSAFE_queryByProps } = render(
      <LoadingIndicator overlay={false} />,
    );
    expect(UNSAFE_queryByProps({ accessibilityViewIsModal: true })).toBeNull();
  });
});

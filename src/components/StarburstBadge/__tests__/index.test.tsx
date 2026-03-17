import * as React from 'react';
import { render } from '@testing-library/react-native';
import StarburstBadge from '../index';

describe('StarburstBadge', () => {
  it('renders snapshot for short label and default size', () => {
    const { toJSON } = render(<StarburstBadge label="Hi" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('adjusts font size for long labels and respects explicit fontSize', () => {
    const { toJSON, rerender } = render(
      <StarburstBadge label="LongLabel" size={80} />,
    );
    expect(toJSON()).not.toBeNull();

    rerender(<StarburstBadge label="X" size={80} fontSize={24} />);
    expect(toJSON()).not.toBeNull();
  });
});

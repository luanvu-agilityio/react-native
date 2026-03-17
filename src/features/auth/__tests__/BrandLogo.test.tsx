import React from 'react';
import { render } from '@testing-library/react-native';

// Mock the YumQuickIcon used by the component
jest.mock('src/icons/YumQuickIcon', () => ({
  __esModule: true,
  default: ({
    color,
    width,
    height,
  }: {
    color?: string;
    width?: number;
    height?: number;
  }) => (
    // @ts-ignore test renderer accepts testID
    <mock-icon testID="yum-icon" color={color} width={width} height={height} />
  ),
}));

import BrandLogo from '../components/BrandLogo';
import { ICON_ASPECT_RATIO } from '../constants/config';

describe('BrandLogo', () => {
  it('renders icon with computed height and title parts', () => {
    const iconWidth = 40;
    const expectedHeight = Math.round(iconWidth * ICON_ASPECT_RATIO);

    const { getByTestId, getByText } = render(
      <BrandLogo
        iconWidth={iconWidth}
        iconColor="#123"
        yumClassName="yum"
        quickClassName="quick"
      />,
    );

    const icon = getByTestId('yum-icon');
    expect(icon.props.color).toBe('#123');
    expect(icon.props.width).toBe(iconWidth);
    expect(icon.props.height).toBe(expectedHeight);

    // Title parts
    expect(getByText('YUM')).toBeTruthy();
    expect(getByText('QUICK')).toBeTruthy();
  });
});

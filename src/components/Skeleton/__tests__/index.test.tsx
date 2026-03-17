import React from 'react';
import { render } from '@testing-library/react-native';
import { Animated } from 'react-native';

import SkeletonBox from '..';

const mockStop = jest.fn();
const mockStart = jest.fn();
const mockReset = jest.fn();
const mockAnimation: Animated.CompositeAnimation = {
  start: mockStart,
  stop: mockStop,
  reset: mockReset,
};

describe('SkeletonBox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Animated, 'timing').mockReturnValue(mockAnimation);
    jest.spyOn(Animated, 'sequence').mockReturnValue(mockAnimation);
    jest.spyOn(Animated, 'loop').mockReturnValue(mockAnimation);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('exports the component', () => {
    expect(typeof SkeletonBox).toBe('function');
  });

  it('renders without crashing', () => {
    const { toJSON } = render(<SkeletonBox />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with className and style props', () => {
    const { toJSON } = render(
      <SkeletonBox className="test-class" style={{ width: 100, height: 20 }} />,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('starts the pulse animation on mount', () => {
    render(<SkeletonBox />);
    expect(Animated.loop).toHaveBeenCalled();
    expect(mockStart).toHaveBeenCalled();
  });

  it('stops the pulse animation on unmount', () => {
    const { unmount } = render(<SkeletonBox />);
    unmount();
    expect(mockStop).toHaveBeenCalled();
  });
});

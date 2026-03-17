import React from 'react';
import { render } from '@testing-library/react-native';
import PromoBannerSkeleton from '../src/features/home/components/skeletons/PromoBannerSkeleton';

test('PromoBannerSkeleton matches snapshot', () => {
  const tree = render(<PromoBannerSkeleton />).toJSON();
  expect(tree).toMatchSnapshot();
});

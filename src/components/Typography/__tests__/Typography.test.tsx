import React from 'react';
import { Text as RNText } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { Typography, TypographyVariant, TypographyWeight } from '../index';

const render = (ui: React.ReactElement) => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    renderer = ReactTestRenderer.create(ui);
  });
  return renderer;
};

const getTextNode = (renderer: ReactTestRenderer.ReactTestRenderer) =>
  renderer.root.findByType(RNText);

describe('Typography', () => {
  it('renders correctly with default props (snapshot)', () => {
    const renderer = render(<Typography>Body text</Typography>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    const renderer = render(<Typography>Hello world</Typography>);
    expect(getTextNode(renderer).props.children).toBe('Hello world');
  });

  it('applies default variant (md) and weight (regular)', () => {
    const renderer = render(<Typography>Default</Typography>);
    const className: string = getTextNode(renderer).props.className;
    expect(className).toContain('text-base');
    expect(className).toContain('font-secondary');
  });

  it('always applies secondary font class', () => {
    const renderer = render(<Typography>Text</Typography>);
    const className: string = getTextNode(renderer).props.className;
    expect(className).toContain('font-secondary');
  });

  it.each([
    ['2xl', 'text-3xl'],
    ['xl', 'text-2xl'],
    ['lg', 'text-17'],
    ['md', 'text-base'],
    ['sm', 'text-15'],
    ['xs', 'text-13'],
  ] as [TypographyVariant, string][])(
    'variant "%s" applies correct size class',
    (variant, sizeClass) => {
      const renderer = render(<Typography variant={variant}>Text</Typography>);
      const className: string = getTextNode(renderer).props.className;
      expect(className).toContain(sizeClass);
    },
  );

  it.each([
    ['light', 'font-secondary-light'],
    ['regular', 'font-secondary'],
    ['medium', 'font-secondary-medium'],
    ['semibold', 'font-secondary-semibold'],
    ['bold', 'font-secondary-bold'],
    ['extrabold', 'font-secondary-extrabold'],
  ] as [TypographyWeight, string][])(
    'weight "%s" applies correct weight class',
    (weight, weightClass) => {
      const renderer = render(<Typography weight={weight}>Text</Typography>);
      const className: string = getTextNode(renderer).props.className;
      expect(className).toContain(weightClass);
    },
  );

  it('merges custom className', () => {
    const renderer = render(
      <Typography className="text-secondary">Colored</Typography>,
    );
    const className: string = getTextNode(renderer).props.className;
    expect(className).toContain('text-secondary');
  });

  it('forwards additional RNText props (numberOfLines)', () => {
    const renderer = render(
      <Typography numberOfLines={2}>Long text</Typography>,
    );
    expect(getTextNode(renderer).props.numberOfLines).toBe(2);
  });

  it('forwards testID', () => {
    const renderer = render(
      <Typography testID="body-text">Content</Typography>,
    );
    expect(getTextNode(renderer).props.testID).toBe('body-text');
  });

  it('forwards accessibilityLabel', () => {
    const renderer = render(
      <Typography accessibilityLabel="price label">$12.99</Typography>,
    );
    expect(getTextNode(renderer).props.accessibilityLabel).toBe('price label');
  });
});

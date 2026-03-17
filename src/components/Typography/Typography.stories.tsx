import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Typography } from './index';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  decorators: [
    Story => (
      <View className="flex-1 justify-center bg-white p-6 gap-4">
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Size2XL: Story = {
  args: { variant: '2xl', children: '2XL — 30px' },
};

export const SizeXL: Story = {
  args: { variant: 'xl', children: 'XL — 24px' },
};

export const SizeLG: Story = {
  args: { variant: 'lg', children: 'LG — 17px' },
};

export const SizeMD: Story = {
  args: { variant: 'md', children: 'MD — 16px (default)' },
};

export const SizeSM: Story = {
  args: { variant: 'sm', children: 'SM — 15px' },
};

export const SizeXS: Story = {
  args: { variant: 'xs', children: 'XS — 13px' },
};

export const WeightLight: Story = {
  args: { weight: 'light', children: 'Light (300)' },
};

export const WeightRegular: Story = {
  args: { weight: 'regular', children: 'Regular (400 — default)' },
};

export const WeightMedium: Story = {
  args: { weight: 'medium', children: 'Medium (500)' },
};

export const WeightSemibold: Story = {
  args: { weight: 'semibold', children: 'Semibold (600)' },
};

export const WeightBold: Story = {
  args: { weight: 'bold', children: 'Bold (700)' },
};

export const WeightExtrabold: Story = {
  args: { weight: 'extrabold', children: 'Extrabold (800)' },
};

export const AllVariants: Story = {
  render: () => (
    <View className="gap-3">
      <Typography variant="2xl" weight="bold">
        2XL Bold — Section title
      </Typography>
      <Typography variant="xl" weight="semibold">
        XL Semibold — Subtitle
      </Typography>
      <Typography variant="lg" weight="medium">
        LG Medium — Lead text
      </Typography>
      <Typography variant="md">MD Regular — Body text (default)</Typography>
      <Typography variant="sm" weight="regular">
        SM — Caption
      </Typography>
      <Typography variant="xs" weight="light">
        XS Light — Fine print
      </Typography>
    </View>
  ),
};

export const CustomColor: Story = {
  args: {
    variant: 'lg',
    weight: 'semibold',
    children: 'Custom color via className',
    className: 'text-secondary',
  },
};

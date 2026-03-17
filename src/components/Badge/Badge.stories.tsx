import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Badge } from './index';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const PriceTag: Story = {
  decorators: [
    Story => (
      <View className="p-6 items-start">
        <Story />
      </View>
    ),
  ],
  args: {
    label: '$103.0',
    variant: 'primary',
  },
};

export const RatingPrimary: Story = {
  decorators: [
    Story => (
      <View className="p-6 items-start">
        <Story />
      </View>
    ),
  ],
  args: {
    label: '5.0',
    variant: 'primary',
    showStar: true,
  },
};

export const RatingOutline: Story = {
  decorators: [
    Story => (
      <View className="p-6 items-start bg-gray-100">
        <Story />
      </View>
    ),
  ],
  args: {
    label: '5.0',
    variant: 'outline',
    showStar: true,
  },
};

export const OutlinePlain: Story = {
  decorators: [
    Story => (
      <View className="p-6 items-start bg-gray-100">
        <Story />
      </View>
    ),
  ],
  args: {
    label: 'New',
    variant: 'outline',
  },
};

export const TagShape: Story = {
  decorators: [
    Story => (
      <View className="p-6 items-start">
        <Story />
      </View>
    ),
  ],
  args: {
    label: '$103.0',
    variant: 'primary',
    shape: 'tag',
  },
};

import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Divider } from './index';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  decorators: [
    Story => (
      <View className="bg-gray-bg p-4">
        <Story />
      </View>
    ),
  ],
  args: {
    color: 'default',
    style: 'solid',
  },
};

export const YellowSolid: Story = {
  decorators: [
    Story => (
      <View className="bg-secondary p-4">
        <Story />
      </View>
    ),
  ],
  args: {
    color: 'yellow',
    style: 'solid',
  },
};

export const WhiteSolid: Story = {
  decorators: [
    Story => (
      <View className="bg-secondary p-4">
        <Story />
      </View>
    ),
  ],
  args: {
    color: 'white',
    style: 'solid',
  },
};

export const WhiteDashed: Story = {
  decorators: [
    Story => (
      <View className="bg-secondary p-4">
        <Story />
      </View>
    ),
  ],
  args: {
    color: 'white',
    style: 'dashed',
  },
};

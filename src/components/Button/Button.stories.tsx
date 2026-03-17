import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    Story => (
      <View className="flex-1 items-center justify-center bg-white p-6 gap-4">
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Log In',
    variant: 'primary',
    onPress: () => {},
  },
};

export const Secondary: Story = {
  args: {
    label: 'Sign Up',
    variant: 'secondary',
    onPress: () => {},
  },
};

export const Outline: Story = {
  args: {
    label: 'Skip',
    variant: 'outline',
    onPress: () => {},
  },
};

export const Ghost: Story = {
  args: {
    label: 'Cancel',
    variant: 'ghost',
    onPress: () => {},
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading...',
    variant: 'primary',
    isLoading: true,
    onPress: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'primary',
    disabled: true,
    onPress: () => {},
  },
};

export const Next: Story = {
  args: {
    label: 'Next',
    variant: 'primary',
    onPress: () => {},
  },
};

export const Small: Story = {
  args: {
    label: 'Cancel',
    variant: 'ghost',
    size: 'sm',
    onPress: () => {},
  },
};

export const Medium: Story = {
  args: {
    label: 'Pay Now',
    variant: 'primary',
    size: 'md',
    onPress: () => {},
  },
};

export const Large: Story = {
  args: {
    label: 'Place Order',
    variant: 'primary',
    size: 'lg',
    onPress: () => {},
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Continue',
    variant: 'primary',
    size: 'md',
    full: true,
    onPress: () => {},
  },
};

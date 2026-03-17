import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// Components
import { BottomNavigationItem } from './index';

// Constants
import { ICON_SIZE, NAV_ITEMS } from './constants';

const meta: Meta<typeof BottomNavigationItem> = {
  title: 'Components/BottomNavigationItem',
  component: BottomNavigationItem,
};

export default meta;

type Story = StoryObj<typeof BottomNavigationItem>;

const InteractiveTemplate = () => {
  const [activeKey, setActiveKey] = useState<string>('home');

  return (
    <View className="bg-secondary rounded-3xl flex-row justify-between items-center px-10 py-5">
      {NAV_ITEMS.map(item => {
        const IconComponent = item.icon;
        return (
          <BottomNavigationItem
            key={item.key}
            icon={<IconComponent width={ICON_SIZE} height={ICON_SIZE} />}
            label={item.label}
            active={activeKey === item.key}
            onPress={() => setActiveKey(item.key)}
          />
        );
      })}
    </View>
  );
};

export const FullBar: Story = {
  render: () => <InteractiveTemplate />,
};

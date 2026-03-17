import { ReactNode, useCallback } from 'react';
import { Pressable } from 'react-native';

// Utils
import { cn } from '@utils/cn';

// Constants
import {
  ITEM_BASE_CLASS,
  ITEM_ACTIVE_CLASS,
  ITEM_INACTIVE_CLASS,
} from './constants';

export interface BottomNavigationItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onPress: () => void;
}

export const BottomNavigationItem = ({
  icon,
  label,
  active = false,
  onPress,
}: BottomNavigationItemProps) => {
  const handlePress = useCallback(() => {
    onPress();
  }, [onPress]);

  const itemClass = cn(
    ITEM_BASE_CLASS,
    active ? ITEM_ACTIVE_CLASS : ITEM_INACTIVE_CLASS,
  );

  return (
    <Pressable
      onPress={handlePress}
      className={itemClass}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
    >
      {icon}
    </Pressable>
  );
};

export default BottomNavigationItem;

import { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

// Utils
import { cn } from '@utils/cn';

// Constants
import {
  ICON_COLOR,
  BUTTON_SIZE_CLASSES,
  TEXT_SIZE_CLASSES,
  ICON_SIZES,
  GAP_CLASSES,
} from './constants';

export interface QuantityControllerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantityController = ({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  disabled = false,
  size = 'md',
}: QuantityControllerProps) => {
  const buttonClass = BUTTON_SIZE_CLASSES[size];
  const textClass = TEXT_SIZE_CLASSES[size];
  const iconSize = ICON_SIZES[size];
  const gapClass = GAP_CLASSES[size] ?? 'gap-3';
  const isDecrementDisabled = disabled || value <= min;
  const isIncrementDisabled = disabled || (max !== undefined && value >= max);

  const handleDecrement = useCallback(() => {
    if (isDecrementDisabled) return;
    onChange(value - step);
  }, [isDecrementDisabled, onChange, value, step]);

  const handleIncrement = useCallback(() => {
    if (isIncrementDisabled) return;
    onChange(value + step);
  }, [isIncrementDisabled, onChange, value, step]);

  return (
    <View
      className={cn(`flex-row items-center ${gapClass}`)}
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel="Quantity"
      accessibilityValue={{ min, max, now: value }}
      accessibilityHint="Use the minus and plus buttons to change the quantity"
    >
      {/* Decrement */}
      <Pressable
        onPress={handleDecrement}
        disabled={isDecrementDisabled}
        className={cn(buttonClass, isDecrementDisabled && 'opacity-40')}
        accessibilityRole="button"
        accessibilityLabel="Decrease quantity"
        accessibilityState={{ disabled: isDecrementDisabled }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={({ pressed }) =>
          !isDecrementDisabled && pressed ? { opacity: 0.7 } : undefined
        }
      >
        <Minus size={iconSize} color={ICON_COLOR} strokeWidth={3} />
      </Pressable>

      {/* Value */}
      <Text
        className={textClass}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {value}
      </Text>

      {/* Increment */}
      <Pressable
        onPress={handleIncrement}
        disabled={isIncrementDisabled}
        className={cn(buttonClass, isIncrementDisabled && 'opacity-40')}
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        accessibilityState={{ disabled: isIncrementDisabled }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={({ pressed }) =>
          !isIncrementDisabled && pressed ? { opacity: 0.7 } : undefined
        }
      >
        <Plus size={iconSize} color={ICON_COLOR} strokeWidth={3} />
      </Pressable>
    </View>
  );
};

export default QuantityController;

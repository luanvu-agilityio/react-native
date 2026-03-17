import { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';

// Utils
import { cn } from '@utils/cn';

// Constants
import {
  RADIO_OUTER_CLASS,
  RADIO_INNER_CLASS,
  ROW_CLASS,
  LABEL_CLASS,
  PRICE_CLASS,
  SEPARATOR_CLASS,
} from './constants';

export interface RadioOption {
  label: string;
  value: string;
  price?: string;
}

export interface RadioControllerProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

interface RadioRowProps {
  option: RadioOption;
  selected: boolean;
  disabled: boolean;
  onSelect: (value: string) => void;
  isLast: boolean;
}

const RadioRow = ({
  option,
  selected,
  disabled,
  onSelect,
  isLast,
}: RadioRowProps) => {
  const handlePress = useCallback(() => {
    if (!disabled) onSelect(option.value);
  }, [disabled, onSelect, option.value]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityLabel={
        option.price ? `${option.label}, ${option.price}` : option.label
      }
      accessibilityState={{ checked: selected, disabled }}
      className={cn(
        ROW_CLASS,
        isLast && 'border-b-0',
        disabled && 'opacity-40',
      )}
      style={({ pressed }) =>
        !disabled && pressed ? { opacity: 0.7 } : undefined
      }
    >
      {/* Label */}
      <Text className={LABEL_CLASS}>{option.label}</Text>

      {/* Dotted separator */}
      <View className={SEPARATOR_CLASS} />

      {/* Price */}
      {option.price ? (
        <Text className={PRICE_CLASS}>{option.price}</Text>
      ) : null}

      {/* Radio circle */}
      <View
        className={RADIO_OUTER_CLASS}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {selected ? <View className={RADIO_INNER_CLASS} /> : null}
      </View>
    </Pressable>
  );
};

export const RadioController = ({
  options,
  value,
  onChange,
  disabled = false,
}: RadioControllerProps) => {
  return (
    <View
      accessible
      accessibilityRole="radiogroup"
      accessibilityLabel="Options"
    >
      {options.map((option, index) => (
        <RadioRow
          key={option.value}
          option={option}
          selected={option.value === value}
          disabled={disabled}
          onSelect={onChange}
          isLast={index === options.length - 1}
        />
      ))}
    </View>
  );
};

export default RadioController;

import { ReactNode } from 'react';
import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

// Utils
import { cn } from '@utils/cn';

const buttonVariants = cva(
  'rounded-full items-center justify-center flex-row',
  {
    variants: {
      variant: {
        primary: 'bg-secondary',
        secondary: 'bg-yellow',
        outline: 'bg-cream',
        ghost: 'bg-peach',
      },
      size: {
        sm: 'py-1.5 px-3 min-w-100',
        md: 'py-2 px-3 min-w-40',
        lg: 'py-2 px-4 min-w-200',
      },
      full: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      full: false,
    },
  },
);

const buttonTextVariants = cva('font-primary-medium text-base', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-secondary',
      outline: 'text-secondary',
      ghost: 'text-secondary',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-2xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const spinnerColorMap: Record<string, string> = {
  primary: '#ffffff',
  secondary: '#391713',
  outline: '#676767',
  ghost: '#E95322',
};

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: ReactNode;
  className?: string;
}

export const Button = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  full = false,
  isLoading = false,
  disabled = false,
  accessibilityLabel,
  style,
  textStyle,
  leftIcon,
  className,
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;
  const spinnerColor = spinnerColorMap[variant ?? 'primary'];

  return (
    <View className={cn(!full ? 'items-center' : '')}>
      <Pressable
        accessible
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled: isDisabled, busy: isLoading }}
        onPress={onPress}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, size, full }),
          isDisabled && 'opacity-50',
          className,
        )}
        style={({ pressed }) => [
          style,
          !isDisabled && pressed && { opacity: 0.8 },
        ]}
      >
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={spinnerColor}
            className={cn(size === 'sm' ? 'mr-1' : 'mr-2')}
          />
        )}
        {leftIcon && (
          <View className={cn(size === 'sm' ? 'mr-1' : 'mr-2', 'items-center')}>
            {leftIcon}
          </View>
        )}
        <Text
          className={cn(buttonTextVariants({ variant, size }))}
          style={textStyle}
        >
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;

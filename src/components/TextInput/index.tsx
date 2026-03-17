import { forwardRef, ReactNode, useCallback, useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';

// Icons
import EyesOnIcon from '../../icons/EyesOnIcon';
import EyesOffIcon from '../../icons/EyesOffIcon';

// Utils
import { cn } from '@utils/cn';

export interface TextInputProps
  extends Omit<RNTextInputProps, 'style' | 'secureTextEntry'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  secureTextEntry?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  maxLength?: number;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  containerClassName?: string;
  variant?: 'default' | 'date';
  numberOnly?: boolean;
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      value,
      onChangeText,
      placeholder,
      label,
      errorMessage,
      secureTextEntry = false,
      leftIcon,
      rightIcon,
      multiline = false,
      numberOfLines = 1,
      editable = true,
      maxLength,
      style,
      inputStyle,
      containerClassName,
      variant = 'default',
      numberOnly = false,
      ...rest
    }: TextInputProps,
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    const hasError = Boolean(errorMessage);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);
    const handleToggleSecure = useCallback(
      () => setIsSecure(prev => !prev),
      [],
    );

    const handleChangeText = useCallback(
      (text: string) => {
        if (numberOnly) {
          const filtered = text.replace(/[^0-9]/g, '');
          onChangeText(filtered);
        } else {
          onChangeText(text);
        }
      },
      [numberOnly, onChangeText],
    );

    const containerClass = cn(
      'bg-cream rounded-2xl px-2 flex-row items-center ',
      multiline ? 'items-start py-3' : 'py-0',
      'focus-within:outline-none',
      isFocused && !hasError && 'border border-secondary',
      hasError && 'border border-red-500',
      !editable && 'opacity-50',
      variant === 'date' && 'px-6',
      containerClassName,
    );

    return (
      <View style={style}>
        {/* Label */}
        {label ? (
          <Text
            className="text-primary font-primary-medium text-xl mb-2 ml-1"
            accessibilityRole="text"
          >
            {label}
          </Text>
        ) : null}

        {/* Input container */}
        <View className={containerClass}>
          {/* Left icon */}
          {leftIcon ? (
            <View className="mr-2" accessibilityElementsHidden>
              {leftIcon}
            </View>
          ) : null}
          {/* Input container */}

          {/* Text input */}
          <RNTextInput
            ref={ref}
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor="#676767"
            secureTextEntry={isSecure}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
            editable={editable}
            maxLength={maxLength}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              'flex-1 text-primary font-primary-medium text-xl py-2.5 focus:outline-none focus:ring-0 focus:border-transparent',
              variant === 'date' ? 'tracking-widest' : '',
            )}
            keyboardType={numberOnly ? 'numeric' : rest.keyboardType}
            style={inputStyle}
            accessibilityLabel={label ?? placeholder}
            accessibilityHint={errorMessage}
            accessibilityState={{ disabled: !editable }}
            textAlignVertical={multiline ? 'top' : 'center'}
            {...rest}
          />

          {/* Secure text toggle */}
          {secureTextEntry ? (
            <Pressable
              onPress={handleToggleSecure}
              className="ml-2 p-1"
              accessibilityRole="button"
              accessibilityLabel={isSecure ? 'Show password' : 'Hide password'}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
            >
              {isSecure ? (
                <EyesOffIcon width={20} height={20} />
              ) : (
                <EyesOnIcon width={20} height={20} />
              )}
            </Pressable>
          ) : rightIcon ? (
            <View className="ml-2" accessibilityElementsHidden>
              {rightIcon}
            </View>
          ) : null}
        </View>

        {/* Error message */}
        {hasError ? (
          <Text
            className="text-red-500 text-md mt-1 ml-1"
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {errorMessage}
          </Text>
        ) : null}
      </View>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;

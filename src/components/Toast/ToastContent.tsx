import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { X } from 'lucide-react-native';

// Utils
import { cn } from '@utils/cn';

import { ToastContentProps } from './types';
import { CLOSE_ICON_SIZE, ICON_COLOR, containerClassMap } from './constants';
import { ToastIcon } from './ToastIcon';

export const ToastContent = ({
  type,
  text1,
  text2,
  onPress,
  hide,
}: ToastContentProps) => {
  const a11yLabel = [text1, text2].filter(Boolean).join('. ');

  const containerClass = cn(
    'flex-row items-center mx-4 px-4 py-3 rounded-2xl',
    containerClassMap[type],
  );

  return (
    <Pressable
      className={containerClass}
      onPress={onPress}
      accessible
      accessibilityRole="alert"
      accessibilityLabel={a11yLabel}
      style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}
    >
      <ToastIcon type={type} />

      <View className="flex-1 ml-3">
        {text1 ? (
          <Text
            className="text-white font-semibold text-sm"
            numberOfLines={1}
            accessibilityRole="text"
          >
            {text1}
          </Text>
        ) : null}
        {text2 ? (
          <Text
            className="text-white text-xs opacity-90"
            numberOfLines={2}
            accessibilityRole="text"
          >
            {text2}
          </Text>
        ) : null}
      </View>

      <Pressable
        onPress={hide}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        className="ml-2"
        style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
      >
        <X size={CLOSE_ICON_SIZE} color={ICON_COLOR} />
      </Pressable>
    </Pressable>
  );
};

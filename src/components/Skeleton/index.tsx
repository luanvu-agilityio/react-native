import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import type { ViewStyle } from 'react-native';

// Utils
import { cn } from '@utils/cn';

export interface SkeletonBoxProps {
  className?: string;
  style?: ViewStyle;
}

export const SkeletonBox = ({ className, style }: SkeletonBoxProps) => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      className={cn('bg-gray-input rounded-lg', className)}
      style={[style, { opacity }]}
    />
  );
};

export default SkeletonBox;

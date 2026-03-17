import { View, Animated } from 'react-native';

// Hooks
import useLoadingAnimation from '@hooks/useLoadingAnimation';

interface LoadingAnimationProps {
  onFinished: () => void;
}

const LoadingAnimation = ({ onFinished }: LoadingAnimationProps) => {
  const { scaleAnim, opacityAnim, dots } = useLoadingAnimation(onFinished);

  return (
    <Animated.View
      className="items-center"
      style={{ opacity: opacityAnim, transform: [{ scale: scaleAnim }] }}
    >
      <View className="w-120 h-120 rounded-full border-4 border-secondary items-center justify-center">
        <View className="flex-row gap-1.5">
          {Array.from({ length: dots }).map((_, i) => (
            <View
              key={`dot-${i}`}
              className="w-2 h-2 rounded-full bg-secondary"
            />
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

export default LoadingAnimation;

import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const useSlideAnimation = (
  isOpen: boolean,
  panelPercent = 0.8,
  duration = 280,
) => {
  const { width } = Dimensions.get('window');
  const translateX = useRef(new Animated.Value(isOpen ? 0 : width)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : width,
      useNativeDriver: true,
      duration,
    }).start();
  }, [isOpen, translateX, width, duration]);

  const panelWidth = Math.round(width * panelPercent);

  return { translateX, panelWidth };
};

export default useSlideAnimation;

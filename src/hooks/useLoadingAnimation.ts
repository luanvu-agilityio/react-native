import { useEffect, useState, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const useLoadingAnimation = (onFinished: () => void) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [dots, setDots] = useState(1);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const dotsTimer = setInterval(
      () => setDots(d => (d >= 3 ? 1 : d + 1)),
      500,
    );
    const finishTimer = setTimeout(() => {
      clearInterval(dotsTimer);
      onFinished();
    }, 2500);
    return () => {
      clearInterval(dotsTimer);
      clearTimeout(finishTimer);
    };
  }, [scaleAnim, opacityAnim, onFinished]);

  return { scaleAnim, opacityAnim, dots };
};

export default useLoadingAnimation;

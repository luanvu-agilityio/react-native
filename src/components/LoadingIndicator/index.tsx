import { View, ActivityIndicator, Text } from 'react-native';

// Utils
import { cn } from '@utils/cn';

// Constants
import {
  SPINNER_SIZES,
  SPINNER_COLORS,
  CONTAINER_CLASS,
  OVERLAY_CLASS,
  MESSAGE_CLASS,
  MESSAGE_COLOR,
} from './constants';

export interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  message?: string;
  overlay?: boolean;
}

export const LoadingIndicator = ({
  size = 'md',
  color = 'secondary',
  message,
  overlay = false,
}: LoadingIndicatorProps) => {
  const spinnerSize = SPINNER_SIZES[size];
  const spinnerColor = SPINNER_COLORS[color];

  const content = (
    <View
      className={CONTAINER_CLASS}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={message ?? 'Loading'}
      accessibilityLiveRegion="polite"
    >
      <ActivityIndicator size={spinnerSize} color={spinnerColor} />
      {message ? (
        <Text className={cn(MESSAGE_CLASS, MESSAGE_COLOR[color])}>
          {message}
        </Text>
      ) : null}
    </View>
  );

  if (overlay) {
    return (
      <View
        className={OVERLAY_CLASS}
        pointerEvents="box-only"
        accessibilityViewIsModal
      >
        {content}
      </View>
    );
  }

  return content;
};

export default LoadingIndicator;

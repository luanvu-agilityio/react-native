import { ReactNode } from 'react';
import { View, Text, type StyleProp, type ViewStyle } from 'react-native';

// Icons
import StarIcon from '@icons/StarIcon';

// Utils
import { cn } from '@utils/cn';

// Constants
import {
  CONTAINER_BASE_CLASS,
  CONTAINER_SHAPE_CLASSES,
  CONTAINER_VARIANT_CLASSES,
  TEXT_VARIANT_CLASSES,
  STAR_ICON_SIZE,
  STAR_ICON_FILL_PRIMARY,
  STAR_ICON_FILL_OUTLINE,
  STAR_ICON_STROKE,
} from './constants';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'outline' | 'counter';
  shape?: 'pill' | 'tag';
  showStar?: boolean;
  icon?: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const Badge = ({
  label,
  variant = 'primary',
  shape = 'pill',
  showStar = false,
  icon,
  className,
  style,
}: BadgeProps) => {
  const containerClass = cn(
    CONTAINER_BASE_CLASS,
    CONTAINER_SHAPE_CLASSES[shape],
    CONTAINER_VARIANT_CLASSES[variant],
    className,
  );

  const textClass = TEXT_VARIANT_CLASSES[variant];

  const starFill =
    variant === 'primary' ? STAR_ICON_FILL_PRIMARY : STAR_ICON_FILL_OUTLINE;

  return (
    <View
      className={containerClass}
      style={style}
      accessible
      accessibilityRole="text"
      accessibilityLabel={showStar ? `${label} stars` : label}
    >
      <Text className={textClass}>{label}</Text>

      {showStar ? (
        <View className="ml-1" accessibilityElementsHidden>
          <StarIcon
            size={STAR_ICON_SIZE}
            color={STAR_ICON_STROKE}
            fill={starFill}
          />
        </View>
      ) : icon ? (
        <View className="ml-1" accessibilityElementsHidden>
          {icon}
        </View>
      ) : null}
    </View>
  );
};

export default Badge;

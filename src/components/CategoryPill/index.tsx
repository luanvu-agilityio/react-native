import { useCallback, type ComponentType } from 'react';
import { View, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import type { SvgProps } from 'react-native-svg';

// Components
import { Typography } from '@components/Typography';

const ICON_SIZE = 32;
const ICON_COLOR = '#E95322';

export type CategoryPillVariant = 'pill' | 'simple';

export type CategoryPillProps = {
  itemKey: string;
  label: string;
  Icon: ComponentType<SvgProps>;
  isActive: boolean;
  onPress: (key: string) => void;
  variant?: CategoryPillVariant;
};

export const CategoryPill = ({
  itemKey,
  label,
  Icon,
  isActive,
  onPress,
  variant = 'pill',
}: CategoryPillProps) => {
  const handlePress = useCallback(() => {
    onPress(itemKey);
  }, [onPress, itemKey]);

  if (variant === 'simple') {
    return (
      <Pressable
        onPress={handlePress}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
        accessibilityLabel={label}
        className="flex flex-col items-center justify-between h-80"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        <View
          className="w-49 h-62 rounded-30 items-center justify-center"
          style={isActive ? styles.simpleActiveOval : styles.simpleInactiveOval}
        >
          <Icon
            width={ICON_SIZE}
            height={ICON_SIZE}
            color={isActive ? '#ffffff' : ICON_COLOR}
          />
        </View>
        <Typography className="text-primary text-center font-primary-medium text-xs">
          {label}
        </Typography>
      </Pressable>
    );
  }

  // variant === 'pill'
  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}
      className="items-center flex-1"
      style={isActive ? styles.pillActive : styles.pillInactive}
    >
      {isActive ? (
        <View style={styles.activePillWrapper}>
          <View style={styles.activePillCard}>
            <View className="w-16 h-20 rounded-full items-center justify-center mb-1.5 bg-yellow">
              <Icon width={ICON_SIZE} height={ICON_SIZE} color={ICON_COLOR} />
            </View>
            <Typography className="text-primary text-center font-primary-medium text-xs pb-2">
              {label}
            </Typography>
          </View>
          {/* Left notch */}
          <View style={styles.notchLeftWhite} />
          <View style={styles.notchLeftOrange} />
          {/* Right notch */}
          <View style={styles.notchRightWhite} />
          <View style={styles.notchRightOrange} />
        </View>
      ) : (
        <View className="items-center pt-3 z-10">
          <View className="w-16 h-20 rounded-full items-center justify-center mb-1.5 bg-cream">
            <Icon width={ICON_SIZE} height={ICON_SIZE} color={ICON_COLOR} />
          </View>
          <Typography className="text-primary text-center font-primary-medium text-xs pb-3 ">
            {label}
          </Typography>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  simpleActiveOval: { backgroundColor: '#F5CB58' },
  simpleInactiveOval: { backgroundColor: '#F3E9B5' },
  pillActive: { zIndex: 1 },
  pillInactive: { zIndex: 2 },
  activePillWrapper: {
    overflow: 'visible',
    alignSelf: 'center',
    marginTop: -5,
    marginBottom: -40,
  },
  activePillCard: {
    width: 80,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 14,
    paddingBottom: 20,
    paddingHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  notchLeftWhite: {
    position: 'absolute',
    bottom: -4,
    left: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  notchLeftOrange: {
    position: 'absolute',
    bottom: 21.5,
    left: -40,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E95322',
    zIndex: 1,
  },
  notchRightWhite: {
    position: 'absolute',
    bottom: -4,
    right: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  notchRightOrange: {
    position: 'absolute',
    bottom: 21,
    right: -39.5,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E95322',
    zIndex: 1,
  },
});

export default CategoryPill;

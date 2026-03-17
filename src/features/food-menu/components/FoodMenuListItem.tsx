import { useCallback } from 'react';
import { View, Pressable, StyleSheet, Image } from 'react-native';

// Components
import { Typography } from '@components/Typography';
import { Badge } from '@components/Badge';

// Hooks
import { useDeviceType } from '@hooks/useDeviceType';

// Types
import type { FoodMenuItem } from '../types';
import StarIcon from '@icons/StarIcon';

interface FoodMenuListItemProps {
  item: FoodMenuItem;
  onPress: (item: FoodMenuItem) => void;
}

const FoodMenuListItem = ({ item, onPress }: FoodMenuListItemProps) => {
  const handlePress = useCallback(() => {
    onPress(item);
  }, [onPress, item]);
  const { isTablet } = useDeviceType();

  return (
    <View style={isTablet ? styles.tabletWrapper : styles.phoneWrapper}>
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, ${item.price}`}
        style={({ pressed }) => (pressed ? { opacity: 0.85 } : undefined)}
      >
        {/* Food image */}
        <View
          style={[styles.imageContainer, { backgroundColor: item.bgColor }]}
        >
          {item.image && (
            <Image source={item.image} style={styles.fill} resizeMode="cover" />
          )}
        </View>

        {/* Text section */}
        <View style={{ flex: 1 }}>
          <View className=" flex-row items-center ">
            <View className="flex-row flex-1 items-center justify-start gap-2">
              {/* Name */}
              <Typography
                variant="lg"
                weight="semibold"
                className="font-secondary-bold "
                numberOfLines={1}
              >
                {item.name}
              </Typography>

              {/* Dot */}
              <View className="w-1.5 h-1.5 rounded-full bg-dark mx-2" />

              {/* Rating badge */}
              <View className="items-center">
                <Badge
                  label={item.rating}
                  shape="pill"
                  icon={
                    <StarIcon size={10} color="transparent" fill="#F5CB58" />
                  }
                />
              </View>
            </View>

            {/* Price */}
            <Typography
              variant="lg"
              weight="bold"
              className="font-primary-bold text-secondary"
            >
              {item.price}
            </Typography>
          </View>
          {/* Description */}
          <Typography
            variant="xs"
            className="text-primary font-primary-light"
            numberOfLines={2}
          >
            {item.description}
          </Typography>
          {/* Divider */}
          <View className="h-px bg-gray-light mt-4" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tabletWrapper: {
    flex: 1,
    maxWidth: '33.3%',
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  phoneWrapper: {
    paddingHorizontal: 36,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 190,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 10,
  },
  fill: { width: '100%', height: '100%' },
});

export default FoodMenuListItem;

import { View, Image, Pressable, StyleSheet } from 'react-native';

// Components
import { Badge } from '@components/index';

// Icons
import FavoriteIcon from '@icons/FavoriteIcon';

// Hooks
import { useDeviceType } from '@hooks/useDeviceType';

// Types
import type { FoodItem } from '../types';
interface FoodCardProps {
  item: FoodItem;
  variant?: 'bestSeller' | 'recommend';
  onPress?: () => void;
}

const FoodCard = ({ item, variant = 'bestSeller', onPress }: FoodCardProps) => {
  const { isTablet } = useDeviceType();

  if (variant === 'recommend') {
    return (
      <Pressable
        onPress={onPress}
        className="flex-1 m-1 min-h-40 relative"
        accessibilityRole="button"
        accessibilityLabel={item.name}
        style={({ pressed }) => (pressed ? { opacity: 0.85 } : undefined)}
      >
        {/* Food image */}
        <View
          className="flex-1 rounded-20 overflow-hidden"
          style={{ backgroundColor: item.bgColor }}
        >
          {item.image && (
            <Image
              source={item.image}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
        </View>

        {/* Rating badge */}
        {item.rating && (
          <View className="absolute top-2 left-2">
            <Badge label={String(item.rating)} showStar variant="outline" />
          </View>
        )}

        {/* Favorite button */}
        <View className="absolute top-2 right-2 w-7.5 h-7.5 rounded-full bg-white items-center justify-center">
          <FavoriteIcon width={14} height={14} color="#E95322" />
        </View>
        {/* Price badge  */}
        <View className="absolute" style={{ right: -2, bottom: 12 }}>
          <Badge label={item.price} variant="primary" shape="tag" />
        </View>
      </Pressable>
    );
  }

  const cardWidth = isTablet ? 200 : 71;
  const cardHeight = isTablet ? 150 : 108;

  return (
    <Pressable
      onPress={onPress}
      className="m-1 relative"
      accessibilityRole="button"
      accessibilityLabel={item.name}
      style={({ pressed }) => [
        { width: cardWidth, height: cardHeight },
        pressed ? { opacity: 0.85 } : undefined,
      ]}
    >
      {/* Food image */}
      <View
        style={[
          styles.cardImage,
          {
            height: cardHeight,
            width: cardWidth,
            backgroundColor: item.bgColor,
          },
        ]}
      >
        {item.image && (
          <Image source={item.image} style={styles.fill} resizeMode="cover" />
        )}
      </View>

      {/* Price badge */}
      <View className="absolute" style={{ right: -2, bottom: 12 }}>
        <Badge label={item.price} variant="primary" shape="tag" />
      </View>
    </Pressable>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  cardImage: { borderRadius: 20, overflow: 'hidden' },
  fill: { width: '100%', height: '100%' },
});

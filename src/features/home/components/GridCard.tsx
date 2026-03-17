import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

// Components
import {
  Badge,
  Heading,
  Typography,
  QuantityController,
} from '@components/index';

// Icons
import StarIcon from '@icons/StarIcon';
import ShoppingCartIcon from '@icons/ShoppingCartIcon';
import FavoriteIcon from '@icons/FavoriteIcon';

// Hooks
import { useDeviceType } from '@hooks/useDeviceType';

// Types
import { FoodItem } from '../types';

interface GridCardProps {
  item: FoodItem;
  onPress: () => void;
}

export const GridCard = ({ item, onPress }: GridCardProps) => {
  const [qty, setQty] = useState(1);
  const { isTablet } = useDeviceType();

  const maxWidth = isTablet ? '33.3%' : '50%';

  return (
    <View className="m-1.5" style={{ flex: 1, maxWidth }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => (pressed ? { opacity: 0.88 } : undefined)}
      >
        <View className="h-140 rounded-2xl overflow-hidden mb-2">
          {item.image && (
            <Image
              source={item.image}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
          {item.rating && (
            <Badge
              label={item.rating}
              shape="pill"
              className="absolute bottom-2 left-2"
              icon={<StarIcon size={10} color="transparent" fill="#F5CB58" />}
            />
          )}
          {item.Icon && (
            <View className="absolute top-2 left-2 w-7.5 h-7.5 rounded-full bg-white items-center justify-center">
              <item.Icon width={16} height={16} />
            </View>
          )}
          <View className="absolute top-2 right-2 w-7.5 h-7.5 rounded-full bg-white items-center justify-center">
            <FavoriteIcon width={14} height={14} color="#E95322" />
          </View>
        </View>

        <View className="mb-2.5 min-h-[72px] justify-center">
          <Heading
            level={6}
            className="text-lg text-primary font-primary-medium mb-1"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.name}
          </Heading>
          <Typography
            variant="xs"
            className="text-primary font-primary-light text-xs"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.description}
          </Typography>
        </View>
      </Pressable>

      <View className="flex-row items-center">
        <Typography className="text-xl text-secondary  flex-1 font-primary-medium">
          {item.price}
        </Typography>
        <QuantityController value={qty} onChange={setQty} min={1} size="md" />
        <Pressable
          onPress={onPress}
          className="ml-2 w-6 h-6 rounded-lg bg-secondary items-center justify-center"
          style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
        >
          <ShoppingCartIcon width={12} height={12} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
};

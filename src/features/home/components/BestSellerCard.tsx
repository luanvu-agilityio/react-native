import { Pressable, View, Image } from 'react-native';

// Components
import { Badge, Heading, Typography } from '@components/index';

// Icons
import FavoriteIcon from '@icons/FavoriteIcon';
import StarIcon from '@icons/StarIcon';
import ShoppingCartIcon from '@icons/ShoppingCartIcon';

// Hooks
import { useDeviceType } from '@hooks/useDeviceType';

// Types
import type { FoodItem } from '../types';

interface BestSellerCardProps {
  item: FoodItem;
  onPress: () => void;
  onCartPress: () => void;
}

export const BestSellerCard = ({
  item,
  onPress,
  onCartPress,
}: BestSellerCardProps) => {
  const { isTablet } = useDeviceType();
  const maxWidth = isTablet ? '33.3%' : '50%';

  return (
    <View className="m-1.5" style={{ flex: 1, maxWidth }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => (pressed ? { opacity: 0.88 } : undefined)}
      >
        <View className="h-170 rounded-2xl overflow-hidden mb-2.5">
          {item.image && (
            <Image
              source={item.image}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
          {item.Icon && (
            <View className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white items-center justify-center">
              <item.Icon width={18} height={18} />
            </View>
          )}

          <View className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white items-center justify-center">
            <FavoriteIcon width={16} height={16} color="#E95322" />
          </View>

          <Badge
            label={item.price}
            shape="tag"
            className="absolute bottom-5 right-0"
          />
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-2 min-h-12 justify-center">
            <Heading
              level={6}
              className="text-lg text-primary font-primary-medium"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.name}
            </Heading>
          </View>

          {item.rating && (
            <Badge
              label={item.rating}
              shape="pill"
              className="ml-1 self-center"
              icon={<StarIcon size={10} color="transparent" fill="#F5CB58" />}
            />
          )}
        </View>

        {/* Cart button */}
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-1 mr-8">
            <Typography
              variant="xs"
              className="text-primary font-primary-light text-xs"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.description}
            </Typography>
          </View>
          <Pressable
            onPress={onCartPress}
            className="w-6 h-6 rounded-lg bg-secondary items-center justify-center"
            style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
          >
            <ShoppingCartIcon width={14} height={14} color="#ffffff" />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

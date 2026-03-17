import { useState } from 'react';
import { Image, Pressable, View, StyleSheet } from 'react-native';

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

// Hooks
import { useDeviceType } from '@hooks/useDeviceType';

// Types
import { FoodItem } from '../types';

interface FeaturedCardProps {
  item: FoodItem;
  onCartPress: () => void;
  onPress?: () => void;
}

export const FeaturedCard = ({
  item,
  onCartPress,
  onPress,
}: FeaturedCardProps) => {
  const [qty, setQty] = useState(1);
  const { isTablet } = useDeviceType();

  if (isTablet) {
    // Tablet
    return (
      <Pressable
        onPress={onPress}
        className="mb-6 mx-4 rounded-3xl overflow-hidden bg-white elevation-2 shadow-sm shadow-black/10"
        style={({ pressed }) => (pressed ? { opacity: 0.88 } : undefined)}
      >
        <View style={styles.tabletImage} className="relative overflow-hidden">
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
              className="absolute bottom-3 left-3"
              icon={<StarIcon size={12} color="transparent" fill="#F5CB58" />}
            />
          )}
          {item.isNew && (
            <Badge
              label="New Product"
              shape="tag"
              className="absolute top-3 right-3"
            />
          )}
        </View>
        {/* Info row */}
        <View className="flex-row items-center px-5 py-4">
          <View className="flex-1 mr-4">
            <Heading
              level={5}
              className="text-xl text-primary font-primary-medium mb-1"
              numberOfLines={1}
            >
              {item.name}
            </Heading>
            <Typography
              variant="xs"
              className="text-primary font-primary-light"
              numberOfLines={2}
            >
              {item.description}
            </Typography>
          </View>
          <View className="flex-row items-center gap-3">
            <Typography className="text-xl text-secondary font-primary-medium">
              {item.price}
            </Typography>
            <QuantityController
              value={qty}
              onChange={setQty}
              min={1}
              size="md"
            />
            <Pressable
              onPress={onCartPress}
              className="w-8 h-8 rounded-xl bg-secondary items-center justify-center"
              style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
            >
              <ShoppingCartIcon width={16} height={16} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className=" mb-4 flex-row rounded-3xl overflow-hidden bg-white elevation-2 shadow-sm shadow-black/10"
      style={({ pressed }) => (pressed ? { opacity: 0.88 } : undefined)}
    >
      <View className="w-40 h-36  relative overflow-hidden">
        {item.image && (
          <Image
            source={item.image}
            className="w-full h-full rounded-3xl"
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
      </View>

      <View className="flex-1 px-3 py-1 justify-between">
        {item.isNew && (
          <Badge
            label="New Product"
            shape="tag"
            className="self-start mb-1.5"
          />
        )}
        <Heading
          level={6}
          className="text-lg text-primary font-primary-medium mb-1"
          numberOfLines={2}
        >
          {item.name}
        </Heading>
        <Typography
          variant="xs"
          className="text-primary mb-2.5 font-primary-light text-xs"
          numberOfLines={2}
        >
          {item.description}
        </Typography>

        <View className="flex-row items-center ">
          <Typography className="text-xl text-secondary  flex-1 font-primary-medium">
            {item.price}
          </Typography>
          <QuantityController value={qty} onChange={setQty} min={1} size="md" />
          <Pressable
            onPress={onCartPress}
            className="ml-2 w-6 h-6 rounded-lg bg-secondary items-center justify-center"
            style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
          >
            <ShoppingCartIcon width={14} height={14} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabletImage: { height: 240 },
});

import { useRef, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  useWindowDimensions,
  ViewToken,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import DotIndicators from '@components/features/DotIndicators';
import PromoBannerSkeleton from './skeletons/PromoBannerSkeleton';

// Hooks
import { usePromoBanners } from '../hooks/usePromoBanners';

// Types
import type { PromoBannerItem } from '../types';
import { Nav } from '@app-types/api';

// Utils
import { apiPromoBannerToPromoBannerItem } from '../utils/mappers';
import { BANNER_BG_COLORS } from '../constants';

const MAX_BANNER_WIDTH = 348;

const BannerItem = ({
  item,
  onPress,
  bannerWidth,
}: {
  item: PromoBannerItem;
  onPress: () => void;
  bannerWidth: number;
}) => (
  <Pressable
    onPress={onPress}
    className="mx-4"
    style={{ width: bannerWidth, maxWidth: MAX_BANNER_WIDTH }}
  >
    <View
      className="h-36 w-full flex-row rounded-20 overflow-hidden"
      style={{ backgroundColor: item.bgColor }}
    >
      {/* Decorative circles */}
      <View className="absolute -top-8 right-[48%] w-14 h-14 rounded-full border-10 border-yellow" />
      <View className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full border-10 border-yellow" />

      {/* Text side */}
      <View className="w-1/2 p-5 justify-center">
        <Text
          className="text-white font-primary-medium text-lg leading-4.5 text-center"
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          className="text-white font-primary-bold text-3xl text-center"
          numberOfLines={1}
        >
          {item.discount != null ? `${item.discount}% OFF` : 'FREE'}
        </Text>
      </View>

      {/* Image side */}
      <View className="w-1/2 rounded-tr-banner rounded-br-banner overflow-hidden">
        {item.image ? (
          <Image
            source={item.image}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full bg-white/10" />
        )}
      </View>
    </View>
  </Pressable>
);

const PromoBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<Nav>();
  const { width: screenWidth } = useWindowDimensions();

  const bannerWidth = Math.min(screenWidth - 32, MAX_BANNER_WIDTH);
  const { data, isLoading } = usePromoBanners();
  const banners = useMemo(
    () =>
      (data?.data ?? []).map((banner, i) => ({
        ...apiPromoBannerToPromoBannerItem(banner),
        bgColor: BANNER_BG_COLORS[i % BANNER_BG_COLORS.length],
      })),
    [data],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  );

  const handleBannerPress = useCallback(
    (item: PromoBannerItem) => {
      if (
        item.foodName &&
        item.price &&
        item.originalPrice &&
        item.rating &&
        item.description
      ) {
        navigation.navigate('FoodDetail', {
          id: item.id,
          name: item.foodName,
          discount: item.discount,
          price: item.price,
          originalPrice: item.originalPrice,
          rating: item.rating,
          description: item.description,
          bgColor: item.bgColor,
          image: item.image?.uri,
        });
      }
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: PromoBannerItem }) => (
      <BannerItem
        item={item}
        onPress={() => handleBannerPress(item)}
        bannerWidth={bannerWidth}
      />
    ),
    [handleBannerPress, bannerWidth],
  );

  const keyExtractor = useCallback((item: PromoBannerItem) => item.id, []);

  if (isLoading) return <PromoBannerSkeleton />;

  return (
    <View className="mb-6">
      <FlatList
        data={banners}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={bannerWidth + 32}
        decelerationRate="fast"
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
        contentContainerClassName="py-1"
        className="-mx-4"
      />

      {/* Pagination dots */}
      <DotIndicators slides={banners} currentIndex={activeIndex} />
    </View>
  );
};

export default PromoBanner;

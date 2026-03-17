import { View, ScrollView, StyleSheet } from 'react-native';
import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import FoodCard from './FoodCard';
import SectionHeader from './SectionHeader';
import BestSellerSectionSkeleton from './skeletons/BestSellerSectionSkeleton';

// Hooks
import { useFoodItems } from '@features/food-menu/hooks/useFoodItems';
import { useDeviceType } from '@hooks/useDeviceType';

// Utils
import { apiFoodItemToFoodItem } from '../utils/mappers';

// Types
import type { FoodItem } from '../types';
import { Nav } from '@app-types/api';

const BestSellerSection = () => {
  const navigation = useNavigation<Nav>();
  const { isTablet } = useDeviceType();
  const { data, isLoading } = useFoodItems({ isBestSeller: true, limit: 4 });
  const items = useMemo(
    () => (data?.data ?? []).map(apiFoodItemToFoodItem),
    [data],
  );

  const scrollHeight = isTablet ? 150 : 128;

  const handleViewAll = useCallback(() => {
    navigation.navigate('BestSeller');
  }, [navigation]);

  const handleItemPress = useCallback(
    (item: FoodItem) => {
      navigation.navigate('FoodDetail', {
        id: item.id,
        name: item.name,
        price: item.price,
        rating: item.rating ?? '0.0',
        description: item.description ?? '',
        bgColor: item.bgColor,
        image: item.image?.uri,
      });
    },
    [navigation],
  );

  if (isLoading) return <BestSellerSectionSkeleton />;

  return (
    <View className="mb-5">
      <SectionHeader title="Best Seller" onViewAll={handleViewAll} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: scrollHeight }}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map(item => (
          <FoodCard
            key={item.id}
            item={item}
            variant="bestSeller"
            onPress={() => handleItemPress(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default BestSellerSection;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
});

import { View } from 'react-native';
import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import FoodCard from './FoodCard';
import SectionHeader from './SectionHeader';
import RecommendSectionSkeleton from './skeletons/RecommendSectionSkeleton';

// Hooks
import { useFoodItems } from '@features/food-menu/hooks/useFoodItems';
import { useDeviceType } from '@hooks/useDeviceType';

// Utils
import { apiFoodItemToFoodItem } from '../utils/mappers';

// Utils
import chunkIntoRows from '@utils/array';

// Types
import type { FoodItem } from '../types';
import { Nav } from '@app-types/api';

const RecommendSection = () => {
  const navigation = useNavigation<Nav>();
  const { isTablet } = useDeviceType();
  const { data, isLoading } = useFoodItems({ isRecommended: true, limit: 4 });
  const items = useMemo(
    () => (data?.data ?? []).map(apiFoodItemToFoodItem),
    [data],
  );

  const handleViewAll = useCallback(() => {
    navigation.navigate('Recommendations');
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

  const columns = isTablet ? 3 : 2;
  const rows = chunkIntoRows(items, columns);

  if (isLoading) return <RecommendSectionSkeleton />;

  return (
    <View className="mb-5">
      <SectionHeader title="Recommend" onViewAll={handleViewAll} />
      <View className="w-full">
        {rows.map((row, rowIndex) => {
          const rowKey = row.map(it => it.id).join('-');
          return (
            <View key={`${rowKey}-${rowIndex}`} className="flex-row mb-2">
              {row.map(item => (
                <FoodCard
                  key={item.id}
                  item={item}
                  variant="recommend"
                  onPress={() => handleItemPress(item)}
                />
              ))}

              {Array.from({ length: columns - row.length }).map((_, i) => (
                <View key={`empty-${rowIndex}-${i}`} className="flex-1 m-4" />
              ))}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RecommendSection;

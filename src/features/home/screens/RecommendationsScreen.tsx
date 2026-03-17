import { useCallback, useRef, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import { Heading, ScreenLayout } from '@components/index';
import { RecommendationsScreenSkeleton } from './skeletons';
import PageHeader from '@components/features/PageHeader';

// Types
import type { FoodItem } from '../types';
import { Nav } from '@app-types/api';

// Hooks
import { useFoodItems } from '@features/food-menu/hooks/useFoodItems';
import { useDeviceType } from '@hooks/useDeviceType';

// Utils
import { apiFoodItemToFoodItem } from '../utils/mappers';
import { FeaturedCard } from '../components/FeaturedCard';
import { GridCard } from '../components/GridCard';

const RecommendationsScreen = () => {
  const navigation = useNavigation<Nav>();
  const { isTablet } = useDeviceType();

  const { data, isLoading } = useFoodItems({ isRecommended: true });
  const allItems = useMemo(
    () => (data?.data ?? []).map(apiFoodItemToFoodItem),
    [data],
  );

  const featured = allItems[0];
  const gridItems = allItems.slice(1);

  const handlePress = useCallback(
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

  const pressHandlers = useRef<Record<string, () => void>>({});
  const getPressHandler = useCallback(
    (item: FoodItem) => {
      if (!pressHandlers.current[item.id]) {
        pressHandlers.current[item.id] = () => handlePress(item);
      }
      return pressHandlers.current[item.id];
    },
    [handlePress],
  );

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <ScreenLayout extendBackgroundToNav={true}>
      {/* Header */}
      <PageHeader
        title="Recommendations"
        onBack={handleGoBack}
        className="h-32 px-9 justify-center"
      />

      {/* Body */}
      <View className="flex-1 bg-white rounded-t-30">
        <FlatList
          data={isLoading ? [] : gridItems}
          keyExtractor={item => item.id}
          numColumns={isTablet ? 3 : 2}
          key={isTablet ? 'tablet' : 'phone'}
          renderItem={({ item }) => (
            <GridCard item={item} onPress={getPressHandler(item)} />
          )}
          ListHeaderComponent={
            <View>
              <Heading
                level={6}
                className="text-center text-secondary mt-6 mb-8 px-9 leading-6.5"
              >
                {'Discover the dishes\nrecommended by the chef.'}
              </Heading>
              {isLoading ? (
                <RecommendationsScreenSkeleton />
              ) : (
                featured && (
                  <FeaturedCard
                    item={featured}
                    onCartPress={getPressHandler(featured)}
                    onPress={getPressHandler(featured)}
                  />
                )
              )}
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-4"
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </ScreenLayout>
  );
};

export default RecommendationsScreen;

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 36 },
  columnWrapper: { marginBottom: 12 },
});

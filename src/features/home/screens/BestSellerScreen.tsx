import { useCallback, useRef, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import { Heading, ScreenLayout } from '@components/index';
import { BestSellerScreenSkeleton } from './skeletons';
import PageHeader from '@components/features/PageHeader';

// Hooks
import { useFoodItems } from '@features/food-menu/hooks/useFoodItems';
import { useDeviceType } from '@hooks/useDeviceType';

// Utils
import { apiFoodItemToFoodItem } from '@features/home/utils/mappers';

// Stores
import { useCartStore } from '@store/cartStore';

// Types
import type { FoodItem } from '../types';
import { Nav } from '@app-types/api';
import { BestSellerCard } from '../components/BestSellerCard';

const BestSellerScreen = () => {
  const navigation = useNavigation<Nav>();
  const addItem = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.openCart);
  const { isTablet } = useDeviceType();

  const { data, isLoading } = useFoodItems({ isBestSeller: true });
  const items = useMemo(
    () => (data?.data ?? []).map(apiFoodItemToFoodItem),
    [data],
  );

  const handleAddToCart = (item: FoodItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price.replace('$', '')),
      quantity: 1,
      bgColor: item.bgColor,
      image: item.image?.uri,
    });
    openCart();
  };

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

  const pressHandlers = useRef<Record<string, () => void>>({});
  const getPressHandler = useCallback(
    (item: FoodItem) => {
      if (!pressHandlers.current[item.id]) {
        pressHandlers.current[item.id] = () => handleItemPress(item);
      }
      return pressHandlers.current[item.id];
    },
    [handleItemPress],
  );

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <ScreenLayout extendBackgroundToNav={true}>
      {/* Header */}
      <PageHeader
        title="Best Sellers"
        onBack={handleGoBack}
        className="h-32 px-9 justify-center"
      />

      {/* Body */}
      <View className="flex-1 bg-white rounded-t-30">
        <FlatList
          data={isLoading ? [] : items}
          keyExtractor={item => item.id}
          numColumns={isTablet ? 3 : 2}
          key={isTablet ? 'tablet' : 'phone'}
          renderItem={({ item }) => (
            <BestSellerCard
              item={item}
              onPress={getPressHandler(item)}
              onCartPress={() => handleAddToCart(item)}
            />
          )}
          ListHeaderComponent={
            <View>
              <Heading
                level={6}
                className="text-center text-secondary mt-6 mb-6 px-9 leading-6.5"
              >
                Discover our most popular dishes!
              </Heading>
              {isLoading && <BestSellerScreenSkeleton />}
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </ScreenLayout>
  );
};

export default BestSellerScreen;

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 10 },
  columnWrapper: { marginBottom: 12 },
});

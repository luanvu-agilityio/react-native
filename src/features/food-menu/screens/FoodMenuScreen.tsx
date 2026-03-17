// Unneeded View import if only used in removed skeleton - keep for FlatList wrapper
import { useState, useCallback, useMemo } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import { FoodMenuListItem } from '../components';
import { ScreenLayout } from '@components/index';
import { FoodMenuSkeleton } from '../components/skeletons';
import MenuListHeader from '../components/MenuListHeader';

// Hooks
import { useFoodItems } from '../hooks/useFoodItems';
import { useDeviceType } from '@hooks/useDeviceType';

// Utils
import { apiFoodItemToFoodMenuItem } from '../utils/mappers';

// Types
import type { FoodMenuItem } from '../types';
import { HomeScreenProps } from '@app-types/navigation';
import { Nav } from '@app-types/api';

const FoodMenuScreen = (props: HomeScreenProps<'FoodMenu'>) => {
  const navigation = useNavigation<Nav>();
  const initialCategory = props.route.params?.category ?? 'snacks';
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const { data, isLoading } = useFoodItems({ categoryId: activeCategory });
  const { isTablet } = useDeviceType();
  const items = useMemo(
    () => (data?.data ?? []).map(apiFoodItemToFoodMenuItem),
    [data],
  );

  const handleItemPress = useCallback(
    (item: FoodMenuItem) => {
      navigation.navigate('FoodDetail', {
        id: item.id,
        name: item.name,
        price: item.price,
        rating: item.rating,
        description: item.description,
        bgColor: item.bgColor,
        image: item.image?.uri,
      });
    },
    [navigation],
  );

  const handleCategoryPress = useCallback((key: string) => {
    setActiveCategory(key ?? 'snacks');
  }, []);

  const listHeader = useMemo(
    () => (
      <MenuListHeader
        activeCategory={activeCategory}
        onCategoryPress={handleCategoryPress}
      />
    ),
    [activeCategory, handleCategoryPress],
  );

  const listEmpty = useMemo(
    () => (isLoading ? <FoodMenuSkeleton /> : null),
    [isLoading],
  );

  return (
    <ScreenLayout extendBackgroundToNav={true}>
      <View style={{ flex: 1 }}>
        <FlatList
          className="bg-white"
          data={isLoading ? [] : items}
          keyExtractor={item => item.id}
          numColumns={isTablet ? 3 : 1}
          key={isTablet ? 'tablet' : 'phone'}
          renderItem={({ item }) => (
            <FoodMenuListItem item={item} onPress={handleItemPress} />
          )}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={listEmpty}
          columnWrapperStyle={isTablet ? styles.columnWrapper : undefined}
        />
      </View>
    </ScreenLayout>
  );
};

export default FoodMenuScreen;

const styles = StyleSheet.create({
  columnWrapper: { marginBottom: 12 },
});

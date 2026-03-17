import { useState, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import { CategoryPill } from '@components/CategoryPill';
import CategorySectionSkeleton from './skeletons/CategorySectionSkeleton';

// Hooks
import { useCategories } from '../hooks/useCategories';

// Utils
import { apiCategoryToCategoryItem } from '../utils/mappers';

// Types
import { Nav } from '@app-types/api';

const CategorySection = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const navigation = useNavigation<Nav>();
  const { data, isLoading } = useCategories();
  const categoryItems = useMemo(
    () => (data?.data ?? []).map(apiCategoryToCategoryItem),
    [data],
  );

  const handleCategoryPress = useCallback(
    (key: string) => {
      setActiveKey(key);
      navigation.navigate('FoodMenu', { category: key });
    },
    [navigation],
  );

  if (isLoading) return <CategorySectionSkeleton />;

  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'visible',
      }}
    >
      {categoryItems.map(({ key, label, Icon }) => {
        const isActive = activeKey === key;
        return (
          <CategoryPill
            key={key}
            itemKey={key}
            label={label}
            Icon={Icon}
            isActive={isActive}
            onPress={handleCategoryPress}
            variant="simple"
          />
        );
      })}
    </View>
  );
};

export default CategorySection;

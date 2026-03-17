import { View, Pressable, StyleSheet } from 'react-native';

// Components
import { Typography } from '@components/Typography';
import { CategoryPill } from '@components/CategoryPill';
import HomeFeatureHeader from '@components/features/HomeFeatureHeader';

// Constants
import { CATEGORY_ITEMS } from '../constants';

// Icons
import FilterIcon from '@icons/FilterIcon';

type MenuListHeaderProps = {
  activeCategory: string;
  onCategoryPress: (key: string) => void;
};

const MenuListHeader = ({
  activeCategory,
  onCategoryPress,
}: MenuListHeaderProps) => (
  <>
    <View className="bg-yellow  pb-5">
      <HomeFeatureHeader />

      <View
        className="bg-secondary rounded-t-3xl pb-5 px-4"
        style={styles.categoryContainer}
        accessibilityRole="tablist"
      >
        <View style={styles.categoryRow} className="z-10">
          {CATEGORY_ITEMS.map(({ key, label, Icon }) => {
            const isActive = activeCategory === key;
            return (
              <CategoryPill
                key={key}
                itemKey={key}
                label={label}
                Icon={Icon}
                isActive={isActive}
                onPress={onCategoryPress}
                variant="pill"
              />
            );
          })}
        </View>
      </View>
    </View>

    <View className="bg-white rounded-t-sheet-lg -mt-12 pt-6 z-20">
      <View className="flex-row items-center px-9 mb-4">
        <Typography variant="xs" className="mr-1.5 font-primary-light">
          Sort By
        </Typography>
        <Typography
          variant="xs"
          weight="semibold"
          className="text-secondary font-primary-light flex-1"
        >
          Popular
        </Typography>
        <Pressable
          accessibilityLabel="Filter"
          hitSlop={8}
          className="w-6 h-6 rounded-full bg-secondary items-center justify-center"
          style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
        >
          <FilterIcon width={12} height={8} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  categoryContainer: {
    overflow: 'visible',
    zIndex: 10,
    paddingTop: 24,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'visible',
  },
});

export default MenuListHeader;

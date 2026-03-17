import { View, ScrollView, StyleSheet } from 'react-native';

import { SkeletonBox } from '@components/Skeleton';
import { ScreenLayout } from '@components/index';

const FoodDetailScreenSkeleton = () => (
  <ScreenLayout extendBackgroundToNav={true}>
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Yellow header ──────────────────────────────── */}
        <View className="bg-yellow px-9 pb-14 pt-2">
          {/* Back button + title row */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              {/* Back icon */}
              <SkeletonBox className="w-7 h-7 rounded-full mr-2 mt-1" />
              {/* Title */}
              <SkeletonBox className="h-6 w-40 rounded-lg" />
            </View>
            {/* Favorite button */}
            <SkeletonBox className="w-6 h-6 rounded-full" />
          </View>

          {/* Rating badge */}
          <SkeletonBox className="h-6 w-16 rounded-full mt-3 ml-6" />
        </View>

        {/* ── White content card ─────────────────────────── */}
        <View className="bg-white rounded-t-sheet-lg -mt-8 pt-8 px-9 flex-1 pb-10">
          {/* Food image */}
          <SkeletonBox
            className="w-full rounded-2xl mb-4"
            style={styles.imageContainer}
          />

          {/* Price + Quantity row */}
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-2">
              <SkeletonBox className="h-8 w-24 rounded-lg" />
            </View>
            <SkeletonBox className="h-10 w-36 rounded-lg" />
          </View>

          {/* Divider */}
          <SkeletonBox className="h-px w-full rounded-lg mb-3" />

          {/* Description block */}
          <View className="mb-3">
            <SkeletonBox className="h-5 w-2/3 rounded-lg mb-2" />
            <SkeletonBox className="h-3 w-full rounded-lg mb-1.5" />
            <SkeletonBox className="h-3 w-5/6 rounded-lg mb-1.5" />
            <SkeletonBox className="h-3 w-3/4 rounded-lg" />
          </View>

          {/* Toppings / Portion section */}
          <View className="mb-10">
            <SkeletonBox className="h-5 w-28 rounded-lg mb-3" />
            <SkeletonBox className="h-12 w-full rounded-xl mb-2" />
            <SkeletonBox className="h-12 w-full rounded-xl mb-2" />
            <SkeletonBox className="h-12 w-full rounded-xl" />
          </View>

          {/* Add to Cart button */}
          <SkeletonBox className="h-14 w-full rounded-2xl" />
        </View>
      </ScrollView>
    </View>
  </ScreenLayout>
);

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 16 },
  imageContainer: { height: 220 },
});

export default FoodDetailScreenSkeleton;

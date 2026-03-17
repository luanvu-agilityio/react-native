import { View } from 'react-native';

import { SkeletonBox } from '@components/Skeleton';
import { useDeviceType } from '@hooks/useDeviceType';

const FeaturedCardSkeleton = () => (
  <View className="flex-row rounded-3xl overflow-hidden mb-4">
    {/* Image side */}
    <SkeletonBox className="w-40 h-36 rounded-3xl" />

    {/* Text side */}
    <View className="flex-1 px-3 py-2 justify-between">
      <SkeletonBox className="h-4 w-4/5 rounded-lg mb-1" />
      <SkeletonBox className="h-3 w-full rounded-lg mb-1" />
      <SkeletonBox className="h-3 w-3/4 rounded-lg mb-2" />
      {/* Price + qty + cart row */}
      <View className="flex-row items-center">
        <SkeletonBox className="h-5 w-12 rounded-lg flex-1" />
        <SkeletonBox className="h-6 w-16 rounded-lg ml-2" />
        <SkeletonBox className="h-6 w-6 rounded-lg ml-2" />
      </View>
    </View>
  </View>
);

const GridCardSkeleton = () => (
  <View className="flex-1 m-1.5">
    {/* Image */}
    <SkeletonBox className="h-140 rounded-2xl mb-2" />

    {/* Name + description */}
    <View className="mb-2.5">
      <SkeletonBox className="h-4 w-4/5 rounded-lg mb-1" />
      <SkeletonBox className="h-3 w-3/4 rounded-lg mb-1" />
      <SkeletonBox className="h-3 w-1/2 rounded-lg" />
    </View>

    {/* Price + qty + cart row */}
    <View className="flex-row items-center">
      <SkeletonBox className="flex-1 h-5 rounded-lg" />
      <SkeletonBox className="h-6 w-16 rounded-lg ml-2" />
      <SkeletonBox className="h-6 w-6 rounded-lg ml-2" />
    </View>
  </View>
);

const RecommendationsScreenSkeleton = () => {
  const { isTablet } = useDeviceType();
  const cols = isTablet ? 3 : 2;

  return (
    <View>
      <FeaturedCardSkeleton />
      {Array.from({ length: 2 }).map((_, row) => (
        <View key={row} className="flex-row mb-3">
          {Array.from({ length: cols }).map(col => (
            <GridCardSkeleton key={col} />
          ))}
        </View>
      ))}
    </View>
  );
};

export default RecommendationsScreenSkeleton;

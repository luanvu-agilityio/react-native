import { View } from 'react-native';

import { SkeletonBox } from '@components/Skeleton';
import { useDeviceType } from '@hooks/useDeviceType';

// Mirrors BestSellerCard: h-170 image, name+rating row, description+cart row
const BestSellerCardSkeleton = () => (
  <View className="flex-1 m-1.5">
    {/* Image */}
    <SkeletonBox className="h-170 rounded-2xl mb-2.5" />

    {/* Name + rating badge row */}
    <View className="flex-row items-center justify-between mb-2">
      <SkeletonBox className="flex-1 h-4 rounded-lg mr-2" />
      <SkeletonBox className="w-10 h-5 rounded-full" />
    </View>

    {/* Description + cart button row */}
    <View className="flex-row items-center justify-between">
      <SkeletonBox className="flex-1 h-3 rounded-lg mr-8" />
      <SkeletonBox className="w-6 h-6 rounded-lg" />
    </View>
  </View>
);

const BestSellerScreenSkeleton = () => {
  const { isTablet } = useDeviceType();
  const cols = isTablet ? 3 : 2;

  return (
    <View className="px-2.5">
      {Array.from({ length: 3 }).map((_, row) => (
        <View key={row} className="flex-row mb-3">
          {Array.from({ length: cols }).map(col => (
            <BestSellerCardSkeleton key={col} />
          ))}
        </View>
      ))}
    </View>
  );
};

export default BestSellerScreenSkeleton;

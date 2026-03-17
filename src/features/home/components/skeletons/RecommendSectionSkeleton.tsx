import { View } from 'react-native';

import { SkeletonBox } from '@components/Skeleton';
import { useDeviceType } from '@hooks/useDeviceType';

const RecommendSectionSkeleton = () => {
  const { isTablet } = useDeviceType();
  const cols = isTablet ? 3 : 2;

  return (
    <View className="mb-5">
      <View className="flex-row items-center justify-between mb-3">
        <SkeletonBox className="w-24 h-4 rounded-lg" />
        <SkeletonBox className="w-14 h-3.5 rounded-lg" />
      </View>
      {Array.from({ length: 2 }).map((_, row) => (
        <View key={`skeleton-row-${row}`} className="flex-row mb-2">
          {Array.from({ length: cols }).map((_, col) => (
            <SkeletonBox
              key={`skeleton-${row}-${col}`}
              className="flex-1 m-1 h-40 rounded-20"
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default RecommendSectionSkeleton;

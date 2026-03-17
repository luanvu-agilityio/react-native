import { View } from 'react-native';

// Skeletons
import { SkeletonBox } from '@components/Skeleton';

// Hooks
import { useDeviceType } from '@hooks/useDeviceType';

const CategorySectionSkeleton = () => {
  const { isTablet } = useDeviceType();

  const pillHeight = isTablet ? 120 : 80;

  return (
    <View className="flex-row justify-between">
      {Array.from({ length: 5 }).map((_, i) => (
        <View key={i} className="items-center" style={{ height: pillHeight }}>
          <SkeletonBox className="w-16 h-20 rounded-full" />
          <SkeletonBox className="w-9 h-2.5 rounded-full mt-1.5" />
        </View>
      ))}
    </View>
  );
};

export default CategorySectionSkeleton;

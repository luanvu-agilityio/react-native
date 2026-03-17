import { View } from 'react-native';

import { SkeletonBox } from '@components/Skeleton';
import { useDeviceType } from '@hooks/useDeviceType';

const FoodMenuItemSkeleton = ({ tablet }: { tablet?: boolean }) => (
  <View
    style={
      tablet
        ? { flex: 1, paddingHorizontal: 8, marginBottom: 20 }
        : { marginBottom: 20, paddingHorizontal: 36 }
    }
  >
    <SkeletonBox
      style={{ width: '100%', height: 190, borderRadius: 24, marginBottom: 10 }}
    />
    <View className="flex-row items-center mb-1">
      <SkeletonBox className="flex-1 h-4 rounded-lg mr-2" />
      <SkeletonBox className="w-12 h-5 rounded-full" />
    </View>
    <SkeletonBox className="w-3/4 h-3 rounded-lg" />
  </View>
);

const FoodMenuSkeleton = () => {
  const { isTablet } = useDeviceType();

  if (isTablet) {
    return (
      <View>
        {Array.from({ length: 3 }).map((_, row) => (
          <View key={row} className="flex-row">
            <FoodMenuItemSkeleton tablet />
            <FoodMenuItemSkeleton tablet />
            <FoodMenuItemSkeleton tablet />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View>
      {Array.from({ length: 4 }).map((_, i) => (
        <FoodMenuItemSkeleton key={i} />
      ))}
    </View>
  );
};

export default FoodMenuSkeleton;

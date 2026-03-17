import { ScrollView, View } from 'react-native';

import { SkeletonBox } from '@components/Skeleton';
import { useDeviceType } from '@hooks/useDeviceType';

const BestSellerSectionSkeleton = () => {
  const { isTablet } = useDeviceType();
  const cardWidth = isTablet ? 200 : 71;
  const cardHeight = isTablet ? 290 : 108;
  const scrollHeight = isTablet ? 310 : 128;

  return (
    <View className="mb-5">
      <View className="flex-row items-center justify-between mb-3">
        <SkeletonBox className="w-24 h-4 rounded-lg" />
        <SkeletonBox className="w-14 h-3.5 rounded-lg" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: scrollHeight }}
        contentContainerStyle={{
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexGrow: 1,
          paddingHorizontal: 4,
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={{ width: cardWidth, marginHorizontal: 4 }}>
            <SkeletonBox
              style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: 20,
                marginBottom: 8,
              }}
            />
            <SkeletonBox className="w-16 h-3 rounded-lg mb-1" />
            <SkeletonBox className="w-12 h-2.5 rounded-lg" />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BestSellerSectionSkeleton;

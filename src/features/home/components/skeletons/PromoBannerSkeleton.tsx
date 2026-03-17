import { useWindowDimensions, View } from 'react-native';

import { SkeletonBox } from '@components/Skeleton';

const PromoBannerSkeleton = () => {
  const { width } = useWindowDimensions();
  const bannerWidth = width - 32;

  return (
    <View className="mb-6">
      <SkeletonBox
        className="mx-4 h-36 rounded-20"
        style={{ width: bannerWidth }}
      />
      <View className="flex-row justify-center gap-1.5 mt-2">
        {[0, 1, 2].map(i => (
          <SkeletonBox key={i} className="w-1.5 h-1.5 rounded-full" />
        ))}
      </View>
    </View>
  );
};

export default PromoBannerSkeleton;

import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';

// Components
import {
  CategorySection,
  BestSellerSection,
  PromoBanner,
  RecommendSection,
} from '../components';
import ScreenLayout from '@components/ScreenLayout';
import HomeFeatureHeader from '@components/features/HomeFeatureHeader';

// Constants
import { GREETING_MAP } from '../constants';

// Hooks
import { useDeviceType } from '@hooks/useDeviceType';

// Utils
import { getGreetingKey } from '../utils/greeting-key';
import { cn } from '@utils/cn';

const HomeScreen = () => {
  const greeting = useMemo(() => GREETING_MAP[getGreetingKey()], []);
  const { isTablet } = useDeviceType();

  const content = (
    <ScrollView showsVerticalScrollIndicator={false}>
      <HomeFeatureHeader greeting={greeting} />

      {/* Category nav*/}
      <View
        className={cn(
          'flex-1 bg-white rounded-t-3xl px-9 pt-6 -mt-6 overflow-visible',
          isTablet ? 'z-10' : 'z-30',
        )}
      >
        <CategorySection />

        {/* Content card */}

        <BestSellerSection />

        <PromoBanner />

        <RecommendSection />
      </View>
    </ScrollView>
  );

  return <ScreenLayout extendBackgroundToNav={true}>{content}</ScreenLayout>;
};

export default HomeScreen;

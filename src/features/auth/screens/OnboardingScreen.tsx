import { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  ListRenderItemInfo,
  ViewToken,
} from 'react-native';

// Constants
import {
  IMAGE_HEIGHT_RATIO,
  LAST_INDEX,
  ONBOARDING_SLIDES,
  type OnboardingSlide,
} from '../constants/onboarding';

// Icons
import ChevronRightIcon from '@icons/ChevronRightIcon';

// Components
import { Heading, Typography, Button } from '@components/index';
import { DotIndicators } from '@components/features';

// Types
import { AuthScreenProps } from '@app-types/navigation';

// Store
import { useAuthStore } from '@store/authStore';

const staticStyles = StyleSheet.create({
  skipButton: { position: 'absolute', top: 48, right: 20 },
  card: { marginTop: -24, elevation: 8 },
});

const OnboardingScreen = ({ navigation }: AuthScreenProps<'Onboarding'>) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);
  const markOnboardingSeen = useAuthStore(s => s.markOnboardingSeen);

  const imageHeight = screenHeight * IMAGE_HEIGHT_RATIO;

  const dynamicStyles = useMemo(() => {
    return StyleSheet.create({
      imageWrapper: { width: screenWidth, height: imageHeight },
      list: { height: imageHeight, flexGrow: 0 },
    });
  }, [screenWidth, imageHeight]);

  const isLastSlide = currentIndex === LAST_INDEX;
  const currentSlide = ONBOARDING_SLIDES[currentIndex];
  const SlideIcon = currentSlide.Icon;

  const handleSkip = useCallback(() => {
    markOnboardingSeen();
    navigation.replace('Welcome');
  }, [navigation, markOnboardingSeen]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    flatListRef.current?.scrollToIndex({ index: nextIndex });
    setCurrentIndex(nextIndex);
  }, [currentIndex]);

  const handleGetStarted = useCallback(() => {
    markOnboardingSeen();
    navigation.replace('Welcome');
  }, [navigation, markOnboardingSeen]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const firstVisible = viewableItems[0];
      if (firstVisible?.index !== null && firstVisible?.index !== undefined) {
        setCurrentIndex(firstVisible.index);
      }
    },
  );

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 });

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<OnboardingSlide>) => (
      <View
        style={dynamicStyles.imageWrapper}
        accessible
        accessibilityRole="image"
        accessibilityLabel={`Slide ${index + 1} of ${
          ONBOARDING_SLIDES.length
        }: ${item.title}`}
      >
        <Image
          source={item.image}
          style={dynamicStyles.imageWrapper}
          resizeMode="cover"
          accessibilityElementsHidden
        />
      </View>
    ),
    [dynamicStyles],
  );

  return (
    <View className="flex-1 bg-white">
      {/* Image carousel */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        style={dynamicStyles.list}
        accessibilityRole="list"
        accessibilityLabel="Onboarding slides"
      />

      {/* Skip button */}
      {!isLastSlide && (
        <Pressable
          style={staticStyles.skipButton}
          className="flex-row items-center justify-center gap-1"
          onPress={handleSkip}
          accessibilityLabel="Skip onboarding"
          accessibilityRole="button"
          accessibilityHint="Navigates directly to the Welcome screen"
        >
          <Typography
            variant="sm"
            weight="semibold"
            className="text-secondary font-primary-semibold "
          >
            Skip
          </Typography>
          <ChevronRightIcon stroke="#E95322" />
        </Pressable>
      )}

      {/* Bottom content card */}
      <View
        className="flex-1 bg-white rounded-t-3xl px-16 pt-4 pb-8 justify-evenly"
        style={staticStyles.card}
        accessibilityLiveRegion="polite"
      >
        {/* Top: icon + title + description */}
        <View className="items-center gap-4">
          <View
            importantForAccessibility="no-hide-descendants"
            accessible={false}
          >
            <SlideIcon width={40} height={40} />
          </View>

          <Heading
            level={5}
            className="text-2xl font-tertiary-black  text-secondary text-center"
            accessibilityRole="header"
          >
            {currentSlide.title}
          </Heading>

          <Typography
            variant="sm"
            className="text-primary font-primary-medium text-sm  text-center leading-6"
          >
            {currentSlide.description}
          </Typography>
        </View>

        {/* Bottom: dot indicators + action button */}
        <View className="items-center gap-12">
          <DotIndicators
            slides={ONBOARDING_SLIDES}
            currentIndex={currentIndex}
          />

          <Button
            label={isLastSlide ? 'Get Started' : 'Next'}
            variant="primary"
            size="md"
            onPress={isLastSlide ? handleGetStarted : handleNext}
            accessibilityLabel={
              isLastSlide ? 'Get started with YumQuick' : 'Go to next slide'
            }
            textStyle={{ fontSize: 17 }}
          />
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

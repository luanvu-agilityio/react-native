import { View } from 'react-native';

// Utils
import { cn } from '@utils/cn';

type Props<T extends { id?: string | number }> = {
  slides: T[];
  currentIndex: number;
};

const DotIndicators = <T extends { id?: string | number }>({
  slides,
  currentIndex,
}: Props<T>) => {
  return (
    <View
      className="w-full flex-row items-center justify-center gap-2"
      accessibilityRole="tablist"
      accessibilityLabel={`Slide ${currentIndex + 1} of ${slides.length}`}
    >
      {slides.map((slide, index) => (
        <View
          key={String(slide.id ?? `slide-${index}`)}
          accessibilityRole="tab"
          accessibilityState={{ selected: index === currentIndex }}
          accessibilityLabel={`Slide ${index + 1}`}
          className={cn(
            'w-5 h-1 rounded-full',
            index === currentIndex ? ' bg-secondary' : ' bg-cream',
          )}
        />
      ))}
    </View>
  );
};

export default DotIndicators;

import { View, Pressable } from 'react-native';

// Components
import { Heading } from '@components/index';

// Icons
import ChevronLeftIcon from '@icons/ChevronLeftIcon';

// Utils
import { cn } from '@utils/cn';

type Props = {
  title: string;
  onBack?: () => void;
  className?: string;
};

const PageHeader = ({
  title,
  onBack,
  className = 'h-32 px-6 justify-center',
}: Props) => {
  return (
    <View className={cn('flex-row items-center', className)}>
      {onBack && (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
        >
          <ChevronLeftIcon />
        </Pressable>
      )}

      <Heading
        level={4}
        className="flex-1 text-center font-primary-bold text-white mb-2"
        accessibilityRole="header"
      >
        {title}
      </Heading>
    </View>
  );
};

export default PageHeader;

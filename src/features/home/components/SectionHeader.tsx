import { View, Pressable } from 'react-native';

// Components
import { Typography } from '@components/index';

// Icons
import { ChevronRightIcon } from '@icons/index';

interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
}

const SectionHeader = ({ title, onViewAll }: SectionHeaderProps) => {
  return (
    <View className="flex-row justify-between items-center mb-3">
      <Typography className="text-xl text-primary font-primary-medium">
        {title}
      </Typography>
      {onViewAll && (
        <Pressable
          onPress={onViewAll}
          className="flex-row items-center gap-2"
          accessibilityLabel={`View all ${title}`}
          style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
        >
          <Typography className="text-xs text-secondary font-primary-semibold ">
            View All
          </Typography>
          <ChevronRightIcon style={{ marginTop: 2 }} />
        </Pressable>
      )}
    </View>
  );
};

export default SectionHeader;

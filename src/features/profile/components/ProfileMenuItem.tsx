import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

// Components
import Typography from '@components/Typography';

// Utils
import { cn } from '@utils/cn';

interface ProfileMenuItemProps {
  icon: ReactNode;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  className?: string;
}

export const ProfileMenuItem = ({
  icon,
  label,
  onPress,
  disabled = false,
  className,
}: ProfileMenuItemProps) => (
  <Pressable
    onPress={disabled ? undefined : onPress}
    accessibilityLabel={label}
    accessibilityState={{ disabled }}
    style={({ pressed }) =>
      pressed && !disabled
        ? { opacity: 0.7 }
        : disabled
        ? { opacity: 0.45 }
        : undefined
    }
  >
    <View className="flex-row items-center  py-6 gap-6">
      <View
        className={cn(
          'w-12 h-12 rounded-2xl bg-white items-center justify-center',
          className,
        )}
      >
        {icon}
      </View>
      <Typography className="text-cream font-primary-medium text-2xl">
        {label}
      </Typography>
    </View>
  </Pressable>
);

import { Text, View } from 'react-native';

// Utils
import { cn } from '@utils/cn';

// Icons
import YumQuickIcon from 'src/icons/YumQuickIcon';

// Constants
import { DEFAULT_ICON_WIDTH, ICON_ASPECT_RATIO } from '../constants/config';

interface BrandLogoProps {
  iconColor?: string;
  yumClassName?: string;
  quickClassName?: string;
  iconWidth?: number;
  titleClassName?: string;
}

const BrandLogo = ({
  iconColor = '#FF642F',
  yumClassName = 'text-secondary',
  quickClassName = 'font-secondary-bold',
  iconWidth = DEFAULT_ICON_WIDTH,
  titleClassName,
}: BrandLogoProps) => {
  const iconHeight = Math.round(iconWidth * ICON_ASPECT_RATIO);

  return (
    <View className="items-center ">
      <YumQuickIcon color={iconColor} width={iconWidth} height={iconHeight} />
      <Text className={cn('text-35 tracking-wider', titleClassName)}>
        <Text className={cn('font-secondary-extrabold', yumClassName)}>
          YUM
        </Text>
        <Text className={cn('font-secondary-bold', quickClassName)}>QUICK</Text>
      </Text>
    </View>
  );
};

export default BrandLogo;

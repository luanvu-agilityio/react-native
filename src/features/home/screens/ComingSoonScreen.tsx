import { View } from 'react-native';

// Components
import { Heading, Typography, Button, ScreenLayout } from '@components/index';

// Types
import { HomeScreenProps } from '@app-types/navigation';

type Props = HomeScreenProps<'ComingSoon'>;

const ComingSoonScreen = ({ navigation }: Props) => {
  const handleGoHome = () => navigation.navigate('Home');

  return (
    <ScreenLayout extendBackgroundToNav={true}>
      {/* Body */}
      <View className="flex-1 bg-white  items-center justify-center px-10">
        <Heading
          level={3}
          className="font-primary-bold text-dark text-center mb-3"
        >
          Coming Soon!
        </Heading>

        <Typography
          variant="md"
          className="font-secondary text-center text-gray-muted mb-10"
        >
          We are working hard to bring you this feature.{'\n'}Stay tuned for
          updates!
        </Typography>

        <Button
          label="Back to Home"
          variant="primary"
          size="md"
          onPress={handleGoHome}
        />
      </View>
    </ScreenLayout>
  );
};

export default ComingSoonScreen;

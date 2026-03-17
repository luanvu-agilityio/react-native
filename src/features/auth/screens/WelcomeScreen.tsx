import { useCallback } from 'react';
import { View } from 'react-native';

// Constants
import { WELCOME_SUBTITLE } from '../constants/config';

// Components
import Button from '@components/Button';
import Typography from '@components/Typography';
import BrandLogo from '../components/BrandLogo';

// Types
import { AuthScreenProps } from '@app-types/navigation';

const WelcomeScreen = ({ navigation }: AuthScreenProps<'Welcome'>) => {
  const handleLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-secondary gap-10 px-16">
      <BrandLogo
        iconColor="#F5CB58"
        yumClassName="text-yellow"
        quickClassName="text-white"
        iconWidth={202}
      />

      <Typography className="text-white font-primary-medium text-sm text-center">
        {WELCOME_SUBTITLE}
      </Typography>

      <View className="gap-1 items-center justify-center">
        <Button
          label="Log In"
          variant="secondary"
          size="lg"
          onPress={handleLogin}
        />
        <Button
          label="Sign Up"
          variant="outline"
          size="lg"
          onPress={handleRegister}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

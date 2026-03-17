import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import {
  OnboardingScreen,
  WelcomeScreen,
  LoginScreen,
  RegisterScreen,
  SetFingerprintScreen,
} from '@features/auth';

// Store
import { useAuthStore } from '@store/authStore';

// Types
import { AuthStackParamList } from '@app-types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const hasSeenOnboarding = useAuthStore(s => s.hasSeenOnboarding);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={hasSeenOnboarding ? 'Welcome' : 'Onboarding'}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="SetFingerprint" component={SetFingerprintScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

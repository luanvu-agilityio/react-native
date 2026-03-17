import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Sub-navigators
import HomeNavigator from './HomeNavigator';
import CheckoutNavigator from './CheckoutNavigator';

// Overlay
import CartOverlay from '@features/cart/components/CartOverlay';
import ProfileOverlay from '@features/profile/components/ProfileOverlay';

// Types
import type { AppStackParamList } from '@app-types/navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => (
  <View className="flex-1">
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={HomeNavigator} />
      <Stack.Screen name="CheckoutStack" component={CheckoutNavigator} />
    </Stack.Navigator>
    <CartOverlay />
    <ProfileOverlay />
  </View>
);

export default AppNavigator;

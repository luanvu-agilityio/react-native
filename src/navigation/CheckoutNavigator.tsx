import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import {
  ConfirmOrderScreen,
  PaymentScreen,
  OrderConfirmedScreen,
  DeliveryTimeScreen,
} from '@features/cart';

// Types
import type { CheckoutStackParamList } from '@app-types/navigation';

const Stack = createNativeStackNavigator<CheckoutStackParamList>();

const CheckoutNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen
      name="OrderConfirmed"
      component={OrderConfirmedScreen}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen name="DeliveryTime" component={DeliveryTimeScreen} />
  </Stack.Navigator>
);

export default CheckoutNavigator;

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import {
  HomeScreen,
  BestSellerScreen,
  RecommendationsScreen,
  ComingSoonScreen,
} from '@features/home';
import { FoodMenuScreen, FoodDetailScreen } from '@features/food-menu';
import { ProfileScreen } from '@features/profile';

// Types
import type { HomeStackParamList } from '@app-types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="FoodMenu" component={FoodMenuScreen} />
    <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
    <Stack.Screen name="BestSeller" component={BestSellerScreen} />
    <Stack.Screen name="Recommendations" component={RecommendationsScreen} />
    <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;

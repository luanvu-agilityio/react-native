import { useCallback } from 'react';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigation
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

// Types
import { RootStackParamList } from '@app-types/navigation';

// Store
import { useAuthStore } from '@store/authStore';

// Lib
import { navigationRef } from '@lib/navigationRef';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const handleReady = useCallback(() => {
    BootSplash.hide({ fade: true });
  }, []);
  const hasHydrated = useAuthStore(state => state._hasHydrated);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  // Wait for AsyncStorage rehydration before rendering the navigator.
  // Returning null keeps the BootSplash visible until hydration finishes,
  // at which point the NavigationContainer mounts and onReady hides the splash.
  if (!hasHydrated) return null;

  return (
    <NavigationContainer ref={navigationRef} onReady={handleReady}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthNavigator} />
            <Stack.Screen name="App" component={AppNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

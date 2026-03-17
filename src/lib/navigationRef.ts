import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

import type { RootStackParamList } from '@app-types/navigation';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Screens that live inside the App (nested) stack.
// When navigating to these from the root (e.g. while on Auth screens),
// we must first navigate to 'App' so React Navigation can resolve the nesting.
const APP_NESTED_SCREENS = ['HomeStack', 'CheckoutStack'];

export const navigateTo = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    const action = APP_NESTED_SCREENS.includes(name)
      ? CommonActions.navigate('App', { screen: name, params })
      : CommonActions.navigate(name, params);
    navigationRef.dispatch(action);
  }
};

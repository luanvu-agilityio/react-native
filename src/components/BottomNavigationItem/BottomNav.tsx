import { View, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigationState } from '@react-navigation/native';
import { navigateTo } from '@lib/navigationRef';

// Components
import { BottomNavigationItem } from './index';

// Constants
import { ICON_COLOR, ICON_SIZE, NAV_ITEMS } from './constants';

export const BottomNav = () => {
  const insets = useSafeAreaInsets();

  const pressHandlers = useRef<Record<string, () => void>>({});

  const getPressHandler = (item: (typeof NAV_ITEMS)[number]) => {
    if (!pressHandlers.current[item.key]) {
      pressHandlers.current[item.key] = () => {
        navigateTo('HomeStack', { screen: item.screen, params: item.params });
      };
    }

    return pressHandlers.current[item.key];
  };
  const currentRoute = useNavigationState(state => state?.routes[state.index]);
  const currentRouteName = currentRoute?.name;
  const currentRouteFromKey = (
    currentRoute?.params as { fromKey?: string } | undefined
  )?.fromKey;

  return (
    <View
      className="bg-secondary flex-row justify-between items-center px-10 rounded-t-30 pt-5"
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 20) }]}
    >
      {NAV_ITEMS.map(item => {
        const IconComponent = item.icon;
        const isActive =
          item.screen === currentRouteName &&
          (currentRouteName !== 'ComingSoon' ||
            currentRouteFromKey === item.key);
        return (
          <BottomNavigationItem
            key={item.key}
            icon={
              <IconComponent
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={ICON_COLOR}
              />
            }
            label={item.label}
            active={isActive}
            onPress={getPressHandler(item)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginBottom: 0,
  },
});

export default BottomNav;

import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigationState } from '@react-navigation/native';
import { navigateTo } from '@lib/navigationRef';

// Constants
import {
  ICON_COLOR,
  ICON_SIZE,
  NAV_ITEMS,
} from '../BottomNavigationItem/constants';

const SIDE_NAV_WIDTH = 80;

const SideNav = () => {
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
      style={[
        styles.container,
        {
          paddingTop: insets.top + 24,
          paddingBottom: Math.max(insets.bottom, 20),
          width: SIDE_NAV_WIDTH,
        },
      ]}
    >
      {NAV_ITEMS.map(item => {
        const IconComponent = item.icon;
        const isActive =
          item.screen === currentRouteName &&
          (currentRouteName !== 'ComingSoon' ||
            currentRouteFromKey === item.key);
        return (
          <Pressable
            key={item.key}
            onPress={getPressHandler(item)}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={({ pressed }) => [
              styles.navItem,
              pressed && styles.navItemPressed,
              isActive ? styles.navItemActive : styles.navItemInactive,
            ]}
          >
            <View style={styles.iconContainer}>
              <IconComponent
                width={ICON_SIZE}
                height={ICON_SIZE}
                color={ICON_COLOR}
              />
              {isActive && <View style={styles.activeIndicator} />}
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E95322',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 24,
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.08)',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 4,
  },
  navItemActive: {
    opacity: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  navItemInactive: {
    opacity: 0.6,
  },
  navItemPressed: {
    opacity: 0.7,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    right: -6,
    top: '50%',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginTop: -2,
  },
  label: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Gilroy-SemiBold',
    textAlign: 'center',
  },
});

export default SideNav;

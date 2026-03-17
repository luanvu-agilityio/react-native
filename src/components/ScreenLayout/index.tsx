import { ReactNode } from 'react';
import { View, StatusBar, StatusBarStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import BottomNav from '@components/BottomNavigationItem/BottomNav';
import SideNav from '@components/SideNav';

// Hooks
import { useDeviceType } from '@hooks/useDeviceType';

interface ScreenLayoutProps {
  children: ReactNode;
  statusBarStyle?: StatusBarStyle;
  statusBarBg?: string;
  showBottomNav?: boolean;
  extendBackgroundToNav?: boolean;
  extendBackgroundColor?: string;
  extendBackgroundRadius?: number;
  extendBackgroundExtraHeight?: number;
}

const ScreenLayout = ({
  children,
  statusBarStyle = 'dark-content',
  statusBarBg = '#F5CB58',
  showBottomNav = true,
  extendBackgroundToNav = false,
  extendBackgroundColor = '#fff',
  extendBackgroundRadius = 30,
  extendBackgroundExtraHeight = 64,
}: ScreenLayoutProps) => {
  const insets = useSafeAreaInsets();
  const { isTablet } = useDeviceType();

  if (isTablet) {
    return (
      <View className="flex-1 flex-row bg-yellow" style={{ gap: 8 }}>
        <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBg} />
        {/* Tablet */}
        {showBottomNav && <SideNav />}
        {/* Main content area */}
        <View className="flex-1 bg-yellow">
          <View style={{ height: insets.top, backgroundColor: statusBarBg }} />
          {extendBackgroundToNav && (
            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height:
                  Math.max(insets.bottom, 20) + extendBackgroundExtraHeight,
                backgroundColor: extendBackgroundColor,
                borderTopLeftRadius: extendBackgroundRadius,
                borderTopRightRadius: extendBackgroundRadius,
              }}
              pointerEvents="none"
            />
          )}
          {children}
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-yellow">
      <View style={{ height: insets.top, backgroundColor: statusBarBg }} />
      <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBg} />
      {/* Bottom panel to hide rounded nav corners */}
      {extendBackgroundToNav && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: Math.max(insets.bottom, 20) + extendBackgroundExtraHeight,
            backgroundColor: extendBackgroundColor,
            borderTopLeftRadius: extendBackgroundRadius,
            borderTopRightRadius: extendBackgroundRadius,
          }}
          pointerEvents="none"
        />
      )}

      {children}
      {showBottomNav && <BottomNav />}
    </View>
  );
};

export default ScreenLayout;

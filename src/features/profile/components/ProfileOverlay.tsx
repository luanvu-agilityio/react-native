import {
  View,
  Pressable,
  Animated,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import { Heading, Typography, Divider, Button } from '@components/index';
import { ProfileMenuItem } from './ProfileMenuItem';

// Constants
import {
  PROFILE_MENU_ITEMS,
  PROFILE_LOGOUT_ITEM,
} from '@features/profile/constants';

// Stores
import { useProfileStore } from '@store/profileStore';
import { useAuthStore } from '@store/authStore';

// Hooks
import { useSignOut } from '@features/auth/hooks/useAuth';
import useSlideAnimation from '@hooks/useSlideAnimation';

// Lib
import { navigateTo } from '@lib/navigationRef';

const TABLET_MAX_PANEL = 500;
const PHONE_PANEL_PERCENT = 0.8;

const ProfileOverlay = () => {
  const insets = useSafeAreaInsets();
  const isOpen = useProfileStore(s => s.isProfileOpen);
  const closeProfile = useProfileStore(s => s.closeProfile);
  const user = useAuthStore(s => s.user);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const signOut = useSignOut();

  const { width: screenWidth } = useWindowDimensions();
  const isTabletDevice = screenWidth >= 768;
  const panelPercent = isTabletDevice
    ? Math.min(TABLET_MAX_PANEL / screenWidth, PHONE_PANEL_PERCENT)
    : PHONE_PANEL_PERCENT;

  const { translateX, panelWidth } = useSlideAnimation(
    isOpen,
    panelPercent,
    280,
  );

  if (!isOpen) return null;

  const initials = user?.name
    ? user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  const handleSignOut = async () => {
    closeProfile();
    await signOut();
  };

  const handleSignIn = () => {
    closeProfile();
    navigateTo('Auth', undefined);
  };

  return (
    <View
      className="absolute inset-0 flex-row z-[1000]"
      pointerEvents="box-none"
    >
      {/* Scrim */}
      <View
        className="absolute inset-0 bg-black"
        style={styles.scrim}
        pointerEvents="none"
      />

      {/* Left transparent strip */}
      <Pressable
        className="bg-transparent"
        style={{ width: screenWidth - panelWidth }}
        onPress={closeProfile}
        accessibilityLabel="Close profile"
        hitSlop={8}
      />

      {/* Sliding panel */}
      <Animated.View
        className="overflow-hidden"
        style={{
          width: panelWidth,
          transform: [{ translateX }],
          paddingTop: insets.top,
        }}
      >
        <View className="flex-1 bg-secondary rounded-tl-[56px] rounded-bl-[56px] overflow-hidden px-9">
          {!isAuthenticated ? (
            /* Guest view */
            <View className="flex-1 items-center justify-center gap-6 pb-10">
              <View className="items-center gap-2">
                <Heading
                  level={4}
                  className="text-gray-bg font-primary-medium text-33 text-center"
                >
                  You're browsing as a guest
                </Heading>
                <Typography className="text-cream text-base font-primary-medium text-center">
                  Sign in to access your profile, orders, and more.
                </Typography>
              </View>
              <View className="gap-1 w-full">
                <Button
                  label="Sign In"
                  variant="secondary"
                  size="lg"
                  onPress={handleSignIn}
                />
                <Button
                  label="Create Account"
                  variant="outline"
                  size="lg"
                  onPress={handleSignIn}
                />
              </View>
            </View>
          ) : (
            /* Authenticated view */
            <>
              {/* Header */}
              <View className="flex-row items-center pt-7 pb-5 gap-6">
                {/* Avatar */}
                <View className="w-14 h-14 rounded-full bg-white/20 items-center justify-center overflow-hidden">
                  {user?.image ? (
                    <Image
                      source={{ uri: user.image }}
                      className="w-14 h-14 rounded-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <Typography className="text-white font-primary-bold text-xl">
                      {initials}
                    </Typography>
                  )}
                </View>

                {/* Name + email */}
                <View className="flex-1">
                  <Heading
                    level={4}
                    className="text-gray-bg font-primary-medium text-33"
                  >
                    {user?.name}
                  </Heading>
                  <Typography className="text-cream text-base font-primary-medium">
                    {user?.email ?? ''}
                  </Typography>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: Math.max(insets.bottom, 20) + 16,
                }}
              >
                {/* Menu items  */}
                {PROFILE_MENU_ITEMS.map(item => (
                  <View key={item.key}>
                    <ProfileMenuItem
                      icon={<item.Icon {...item.iconProps} />}
                      label={item.label}
                      disabled={item.disabled}
                    />
                    <Divider />
                  </View>
                ))}

                {/* Log Out  */}
                <View className="mt-10">
                  <ProfileMenuItem
                    className="w-9 h-9 rounded-full"
                    icon={
                      <PROFILE_LOGOUT_ITEM.Icon
                        {...PROFILE_LOGOUT_ITEM.iconProps}
                      />
                    }
                    label={PROFILE_LOGOUT_ITEM.label}
                    onPress={handleSignOut}
                  />
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default ProfileOverlay;

const styles = StyleSheet.create({
  scrim: { opacity: 0.04 },
});

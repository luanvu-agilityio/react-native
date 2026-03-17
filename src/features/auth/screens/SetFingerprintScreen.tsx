import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

// Components
import { Typography, Button } from '@components/index';
import ScreenLayout from '@components/ScreenLayout';
import PageHeader from '@components/features/PageHeader';

// Icons
import LargeFingerprintIcon from '@icons/LargeFingerprintIcon';

// Types
import { AuthScreenProps } from '@app-types/navigation';

const styles = StyleSheet.create({
  card: { marginTop: -24 },
});

const SetFingerprintScreen = ({
  navigation,
}: AuthScreenProps<'SetFingerprint'>) => {
  const [isActive, setIsActive] = useState(false);

  const handleGoBack = () => navigation.goBack();
  const handleToggleFingerprint = () => setIsActive(prev => !prev);
  const handleProceed = () =>
    navigation.reset({
      index: 1,
      routes: [{ name: 'Welcome' }, { name: 'Login' }],
    });

  return (
    <ScreenLayout
      showBottomNav={true}
      statusBarStyle="light-content"
      statusBarBg="#F5CB58"
      extendBackgroundToNav={true}
    >
      <View className="flex-1">
        {/* ── Yellow header ── */}
        <PageHeader
          title="Set Your Fingerprint"
          onBack={handleGoBack}
          className="h-36 px-6 justify-end pb-8"
        />

        {/* ── White card ── */}
        <View
          className="flex-1 rounded-t-3xl bg-white px-6 pt-8 pb-10"
          style={styles.card}
        >
          {/* Description */}
          <Typography variant="md" className="text-primary leading-6">
            Add a fingerprint to make your account more secure and sign in
            faster.
          </Typography>

          {/* Fingerprint icon — tap to activate */}
          <View className="flex-1 items-center justify-center">
            <Pressable
              onPress={handleToggleFingerprint}
              accessibilityRole="button"
              accessibilityLabel={
                isActive
                  ? 'Fingerprint scanned, tap to reset'
                  : 'Tap to scan fingerprint'
              }
              accessibilityState={{ selected: isActive }}
              style={({ pressed }) => (pressed ? { opacity: 0.9 } : undefined)}
            >
              <LargeFingerprintIcon
                color={isActive ? '#E95322' : '#FFDECF'}
                width="241"
                height="312"
              />
            </Pressable>
          </View>

          {/* Skip / Continue buttons */}
          <View className="flex-row items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="md"
              label="Skip"
              onPress={handleProceed}
              accessibilityLabel="Skip fingerprint setup"
            />

            <Button
              size="md"
              label="Continue"
              onPress={handleProceed}
              accessibilityLabel="Continue with fingerprint"
            />
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SetFingerprintScreen;

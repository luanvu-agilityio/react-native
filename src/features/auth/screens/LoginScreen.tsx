import {
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Icons
import PageHeader from '@components/features/PageHeader';

// Constants
import { SOCIAL_BUTTONS, LOGIN_SUBTITLE } from '../constants/config';
import { VALIDATION_MESSAGES, TOAST_MESSAGES } from '@constants/message';

// Components
import { Typography, Button, FormTextInput, Heading } from '@components/index';
import ScreenLayout from '@components/ScreenLayout';

// Utils
import { SignInFormData, signInSchema, EMAIL_REGEX } from '../utils/validation';
import { classifyAuthError, type AuthErrorInfo } from '../utils/authError';

// Components
import { AuthErrorMessage } from '../components/AuthErrorMessage';

// Hooks
import { useSignIn } from '../hooks/useAuth';

// Toast
import { toast } from '@components/Toast';

// Types
import { AuthScreenProps } from '@app-types/navigation';

const styles = StyleSheet.create({
  card: { marginTop: -24 },
  scrollContent: { flexGrow: 1 },
  logInButton: { alignSelf: 'center' },
});

const LoginScreen = ({ navigation }: AuthScreenProps<'Login'>) => {
  const signIn = useSignIn();
  const [authError, setAuthError] = useState<AuthErrorInfo | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { emailOrPhone: '', password: '' },
  });

  const onSubmit = async (data: SignInFormData) => {
    if (!EMAIL_REGEX.test(data.emailOrPhone)) {
      setError('emailOrPhone', {
        message: VALIDATION_MESSAGES.phoneSignInUnsupported,
      });
      return;
    }

    setAuthError(null);
    const result = await signIn(data.emailOrPhone, data.password);

    if (result.error) {
      setAuthError(classifyAuthError(result.error.message));
      return;
    }

    toast.success(
      TOAST_MESSAGES.loginSuccessTitle,
      TOAST_MESSAGES.loginSuccessMessage,
    );
  };

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleNavigateRegister = useCallback(
    () => navigation.navigate('Register'),
    [navigation],
  );

  return (
    <ScreenLayout
      showBottomNav={true}
      statusBarStyle="light-content"
      statusBarBg="#F5CB58"
      extendBackgroundToNav={true}
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Yellow header */}
          <PageHeader
            title="Log In"
            onBack={handleGoBack}
            className="h-48 px-6 justify-center"
          />

          {/* ── White card ── */}
          <View
            className="flex-1 bg-white rounded-t-3xl px-10 pt-8 pb-14"
            style={styles.card}
          >
            {/* Welcome section */}
            <Heading level={5} className="mb-2">
              Welcome
            </Heading>
            <Typography className="text-dark font-primary-light mb-11 leading-5 text-sm">
              {LOGIN_SUBTITLE}
            </Typography>

            {/* Form fields */}
            <View className="gap-3">
              <FormTextInput
                control={control}
                name="emailOrPhone"
                label="Email or Mobile Number"
                placeholder="example@example.com"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                editable={!isSubmitting}
                returnKeyType="next"
                accessibilityLabel="Email or Mobile Number input"
              />

              <FormTextInput
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                editable={!isSubmitting}
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
                accessibilityLabel="Password input"
              />
            </View>

            <AuthErrorMessage error={authError} />

            {/* Forget password */}
            <Pressable
              className="items-end mt-3 mb-8"
              accessibilityRole="button"
              accessibilityLabel="Forgot password"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              disabled={isSubmitting}
              style={({ pressed }) =>
                pressed && !isSubmitting ? { opacity: 0.7 } : undefined
              }
            >
              <Typography
                variant="sm"
                weight="medium"
                className="text-secondary font-primary-medium text-sm"
              >
                Forget Password
              </Typography>
            </Pressable>

            {/* Log In button */}
            <Button
              label="Log In"
              size="lg"
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              accessibilityLabel="Log in to your account"
              style={styles.logInButton}
            />

            {/* Divider */}
            <Typography
              variant="sm"
              className="text-dark font-primary-light text-sm text-center mt-10 mb-1"
            >
              or sign up with
            </Typography>

            {/* Social login buttons */}
            <View
              className="flex-row justify-center gap-5 mb-8"
              accessibilityLabel="Social sign in options"
            >
              {SOCIAL_BUTTONS.map(({ id, Icon, label }) => (
                <Pressable
                  key={id}
                  className="w-12 h-12 rounded-2xl bg-peach items-center justify-center"
                  accessibilityRole="button"
                  accessibilityLabel={label}
                  disabled={isSubmitting}
                  style={({ pressed }) =>
                    pressed && !isSubmitting ? { opacity: 0.7 } : undefined
                  }
                >
                  <Icon />
                </Pressable>
              ))}
            </View>

            {/* Sign up link */}
            <View className="flex-row justify-center items-center">
              <Typography
                variant="sm"
                className="text-dark font-primary-light text-sm"
              >
                {"Don't have an account? "}
              </Typography>
              <Pressable
                onPress={handleNavigateRegister}
                accessibilityRole="link"
                accessibilityLabel="Sign up for a new account"
                disabled={isSubmitting}
                style={({ pressed }) =>
                  pressed && !isSubmitting ? { opacity: 0.7 } : undefined
                }
              >
                <Typography
                  variant="sm"
                  weight="semibold"
                  className="text-secondary font-primary-light text-sm"
                >
                  Sign Up
                </Typography>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default LoginScreen;

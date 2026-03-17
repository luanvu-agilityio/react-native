import { useRef, useCallback, useState, useMemo } from 'react';
import {
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Modal,
  TextInput as RNTextInput,
} from 'react-native';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Constants
import { SOCIAL_BUTTONS } from '../constants/config';

// Components
import { Typography, Button, FormTextInput } from '@components/index';
import ScreenLayout from '@components/ScreenLayout';
import { TextInput } from '@components/TextInput';

// Icons

// Utils
import { SignUpFormData, signUpSchema } from '../utils';
import { classifyAuthError, type AuthErrorInfo } from '../utils/authError';
import { formatDateDisplay, formatDateToISO } from '@utils/index';

// Components
import { AuthErrorMessage } from '../components/AuthErrorMessage';

// Hooks
import { useSignUp } from '../hooks/useAuth';

// Toast
import { toast } from '@components/Toast';
import { TOAST_MESSAGES } from '@constants/message';

// Types
import { AuthScreenProps } from '@app-types/navigation';
import PageHeader from '@components/features/PageHeader';

const styles = StyleSheet.create({
  card: { marginTop: -24 },
  scrollContent: { flexGrow: 1 },
  datePicker: { height: 200 },
  signUpButton: { alignSelf: 'center' },
});

const RegisterScreen = ({ navigation }: AuthScreenProps<'Register'>) => {
  const signUp = useSignUp();
  const [authError, setAuthError] = useState<AuthErrorInfo | null>(null);

  const emailRef = useRef<RNTextInput>(null);
  const mobileRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState('');

  const today = useMemo(() => new Date(), []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      dateOfBirth: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setAuthError(null);
    const result = await signUp({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phone: data.mobileNumber,
    });

    if (result.error) {
      setAuthError(classifyAuthError(result.error.message));
      return;
    }

    toast.success(
      TOAST_MESSAGES.registrationSuccessTitle,
      TOAST_MESSAGES.registrationSuccessMessage,
    );
    navigation.navigate('SetFingerprint');
  };

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleNavigateLogin = useCallback(
    () => navigation.navigate('Login'),
    [navigation],
  );

  const handleOpenDatePicker = useCallback(() => setShowDatePicker(true), []);

  const handleDateChange = useCallback(
    (_event: DateTimePickerEvent, date?: Date) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
        if (date) {
          setPickerDate(date);
          setDisplayDate(formatDateDisplay(date));
          setValue('dateOfBirth', formatDateToISO(date), {
            shouldValidate: true,
          });
          passwordRef.current?.focus();
        }
      } else if (date) {
        setPickerDate(date);
      }
    },
    [setValue],
  );

  const handleConfirmDate = useCallback(() => {
    setShowDatePicker(false);
    setDisplayDate(formatDateDisplay(pickerDate));
    setValue('dateOfBirth', formatDateToISO(pickerDate), {
      shouldValidate: true,
    });
    passwordRef.current?.focus();
  }, [pickerDate, setValue]);

  const handleCancelDate = useCallback(() => setShowDatePicker(false), []);

  const handleFocusEmail = useCallback(() => emailRef.current?.focus(), []);
  const handleFocusMobile = useCallback(() => mobileRef.current?.focus(), []);

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
            title="New Account"
            onBack={handleGoBack}
            className="h-48 px-6 justify-center"
          />

          {/* ── White card ── */}
          <View
            className="flex-1 rounded-t-3xl bg-white px-10 pt-8 pb-14"
            style={styles.card}
          >
            {/* Form fields */}
            <View className="gap-2">
              <FormTextInput
                control={control}
                name="fullName"
                label="Full name"
                placeholder="Enter your full name"
                returnKeyType="next"
                onSubmitEditing={handleFocusEmail}
                blurOnSubmit={false}
              />

              <FormTextInput
                ref={emailRef}
                control={control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={handleFocusMobile}
                blurOnSubmit={false}
              />

              <FormTextInput
                ref={mobileRef}
                control={control}
                name="mobileNumber"
                label="Mobile Number"
                placeholder="+1 234 567 8901"
                keyboardType="phone-pad"
                returnKeyType="next"
                onSubmitEditing={handleOpenDatePicker}
                blurOnSubmit={false}
              />

              <Pressable
                onPress={handleOpenDatePicker}
                accessibilityRole="button"
                accessibilityLabel="Select date of birth"
                style={({ pressed }) =>
                  pressed ? { opacity: 0.7 } : undefined
                }
              >
                <View pointerEvents="none">
                  <Controller
                    control={control}
                    name="dateOfBirth"
                    render={({ fieldState: { error } }) => (
                      <TextInput
                        value={displayDate}
                        onChangeText={() => {}}
                        label="Date of birth"
                        placeholder="DD / MM / YYYY"
                        errorMessage={error?.message}
                      />
                    )}
                  />
                </View>
              </Pressable>

              {showDatePicker && Platform.OS === 'android' && (
                <DateTimePicker
                  value={pickerDate}
                  mode="date"
                  display="default"
                  maximumDate={today}
                  onChange={handleDateChange}
                />
              )}

              {Platform.OS === 'ios' && (
                <Modal
                  transparent
                  animationType="slide"
                  visible={showDatePicker}
                  onRequestClose={handleCancelDate}
                >
                  <View className="flex-1 justify-end bg-dark">
                    <View className="bg-white rounded-t-3xl px-6 pt-4 pb-8">
                      <View className="flex-row justify-between mb-2">
                        <Pressable
                          onPress={handleCancelDate}
                          accessibilityRole="button"
                          accessibilityLabel="Cancel"
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          style={({ pressed }) =>
                            pressed ? { opacity: 0.7 } : undefined
                          }
                        >
                          <Typography className="text-secondary text-sm font-primary-medium">
                            Cancel
                          </Typography>
                        </Pressable>
                        <Pressable
                          onPress={handleConfirmDate}
                          accessibilityRole="button"
                          accessibilityLabel="Confirm date"
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                          style={({ pressed }) =>
                            pressed ? { opacity: 0.7 } : undefined
                          }
                        >
                          <Typography className="text-secondary text-sm font-primary-medium">
                            Done
                          </Typography>
                        </Pressable>
                      </View>
                      <DateTimePicker
                        value={pickerDate}
                        mode="date"
                        display="spinner"
                        maximumDate={today}
                        onChange={handleDateChange}
                        style={styles.datePicker}
                      />
                    </View>
                  </View>
                </Modal>
              )}

              <FormTextInput
                ref={passwordRef}
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={handleSubmit(onSubmit)}
                blurOnSubmit={false}
              />
            </View>

            <AuthErrorMessage error={authError} />

            {/* Terms of use */}
            <View className="items-center mt-6 mb-4">
              <Typography className="text-center text-dark leading-5 font-primary-light text-xs">
                {'By continuing, you agree to\n'}
                <Typography className="text-secondary text-xs font-primary-medium">
                  Terms of Use
                </Typography>
                <Typography className="text-dark text-xs font-primary-light">
                  {' and '}
                </Typography>
                <Typography className="text-secondary text-xs font-primary-medium">
                  Privacy Policy.
                </Typography>
              </Typography>
            </View>

            {/* Sign Up button */}
            <Button
              label="Sign Up"
              size="lg"
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              disabled={isSubmitting}
              accessibilityLabel="Sign Up"
              style={styles.signUpButton}
            />

            {/* Social sign-up */}
            <Typography className="text-dark font-primary-light text-xs text-center mt-1 mb-1">
              or sign up with
            </Typography>

            <View className="flex-row justify-center gap-4 mb-2">
              {SOCIAL_BUTTONS.map(({ id, Icon, label }) => (
                <Pressable
                  key={id}
                  className="w-12 h-12 bg-peach items-center justify-center rounded-2xl"
                  accessibilityRole="button"
                  accessibilityLabel={label}
                  style={({ pressed }) =>
                    pressed ? { opacity: 0.7 } : undefined
                  }
                >
                  <Icon />
                </Pressable>
              ))}
            </View>

            {/* Log In link */}
            <View className="flex-row justify-center items-center">
              <Typography className="text-dark font-primary-light text-xs">
                {'Already have an account? '}
              </Typography>
              <Pressable
                onPress={handleNavigateLogin}
                accessibilityRole="link"
                accessibilityLabel="Log In"
                style={({ pressed }) =>
                  pressed ? { opacity: 0.7 } : undefined
                }
              >
                <Typography className="text-secondary font-primary-medium text-xs">
                  Log In
                </Typography>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

export default RegisterScreen;

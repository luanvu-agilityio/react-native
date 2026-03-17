import { useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Pencil } from 'lucide-react-native';

// Constants
import {
  MOCK_SHIPPING_ADDRESS,
  DELIVERY_STEPS,
  ESTIMATED_DELIVERY,
} from '../constants';

// Components
import {
  Typography,
  TextInput,
  Divider,
  Button,
  Heading,
  ScreenLayout,
} from '@components/index';
import PageHeader from '@components/features/PageHeader';

// Types
import { CheckoutNav } from '@app-types/api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DeliveryTimeScreen = () => {
  const navigation = useNavigation<CheckoutNav>();
  const insets = useSafeAreaInsets();
  const handleGoBack = () => navigation.goBack();
  const handleReturnHome = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'HomeStack',
            state: { routes: [{ name: 'Home' }] },
          },
        ],
      }),
    );
  const [address, setAddress] = useState(MOCK_SHIPPING_ADDRESS);

  return (
    <ScreenLayout extendBackgroundToNav={true}>
      {/* Header */}
      <PageHeader title="Confirm Order" onBack={handleGoBack} />

      {/* Body */}
      <View className="relative flex-1 bg-white rounded-tl-3xl rounded-tr-3xl px-9 pt-5">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Shipping Address */}
          <View className="flex-row items-center mb-2">
            <Heading level={4} className="font-primary-bold text-2xl text-dark">
              Shipping Address
            </Heading>
            <Pressable
              className="ml-2"
              style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
            >
              <Pencil size={16} color="#E95322" />
            </Pressable>
          </View>

          <View className="mb-6">
            <TextInput
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              placeholder="Shipping address"
              containerClassName="px-2 py-0"
              inputStyle={styles.addressInput}
            />
          </View>

          {/* Map placeholder */}
          <View className="h-180 rounded-2xl bg-gray-input mb-6 overflow-hidden items-center justify-center ">
            <Typography className="font-secondary text-sm text-gray-muted">
              Map View
            </Typography>
          </View>

          {/* Delivery Time */}
          <Heading
            level={6}
            className="font-primary-medium text-lg text-primary"
          >
            Delivery Time
          </Heading>
          <View className="flex-row justify-between mb-7 mt-4">
            <Typography className="font-primary-light text-sm text-primary">
              Estimated Delivery
            </Typography>
            <Typography className="font-primary-medium text-xl text-secondary">
              {ESTIMATED_DELIVERY}
            </Typography>
          </View>

          {/* Divider */}

          <Divider classname="mb-4" />

          {/* Steps timeline */}
          {DELIVERY_STEPS.map((step, index) => (
            <View key={step.label} className="flex-row items-start mb-4">
              {/* Dot + line */}
              <View className="items-center mr-3 w-3">
                <View className="w-2.5 h-2.5 rounded-full bg-peach mt-1" />
                {index < DELIVERY_STEPS.length - 1 && (
                  <View className="w-0.5 h-4 bg-peach-light mt-1" />
                )}
              </View>

              <Typography className="flex-1 font-primary-light text-sm text-primary leading-4.5">
                {step.label}
              </Typography>
              <Typography className="font-primary-light text-sm text-primary">
                {step.time}
              </Typography>
            </View>
          ))}

          {/* Action buttons */}

          <View
            className="gap-1 flex-row items-center justify-center mt-10"
            style={{
              paddingBottom: insets.bottom + 32,
            }}
          >
            <Button
              label="Return Home"
              variant="ghost"
              size="md"
              textStyle={styles.actionButtonText}
              onPress={handleReturnHome}
            />
            <Button
              label="Track Order"
              variant="primary"
              size="md"
              textStyle={styles.actionButtonText}
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  addressInput: { padding: 0, fontSize: 13, color: '#222' },
  actionButtonText: { fontSize: 20 },
});

export default DeliveryTimeScreen;

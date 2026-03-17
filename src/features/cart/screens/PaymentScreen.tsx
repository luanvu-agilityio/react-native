import { useState, useMemo } from 'react';
import {
  View,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Pencil } from 'lucide-react-native';

// Components
import {
  Heading,
  Typography,
  TextInput,
  Button,
  Divider,
  ScreenLayout,
} from '@components/index';

// Constants
import {
  MOCK_SHIPPING_ADDRESS,
  MOCK_PAYMENT_CARD,
  ESTIMATED_DELIVERY,
} from '../constants';

// Icons
import CardIcon from '@icons/CardIcon';
import PageHeader from '@components/features/PageHeader';

// Stores
import { useCartStore } from '@store/cartStore';

// Types
import { CheckoutNav } from '@app-types/api';

const PaymentScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<CheckoutNav>();
  const items = useCartStore(s => s.items);
  const getTotal = useCartStore(s => s.getTotal);

  const total = useMemo(() => getTotal(), [getTotal]);

  const handleGoBack = () => navigation.goBack();
  const handlePayNow = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'HomeStack',
            state: { routes: [{ name: 'Home' }] },
          },
          {
            name: 'CheckoutStack',
            state: {
              routes: [{ name: 'OrderConfirmed', params: { success: true } }],
            },
          },
        ],
      }),
    );
  const [address, setAddress] = useState(MOCK_SHIPPING_ADDRESS);

  return (
    <ScreenLayout extendBackgroundToNav={true}>
      {/* Header */}
      <PageHeader title="Payment method" onBack={handleGoBack} />

      {/* Body */}
      <View className="flex-1 bg-white rounded-tl-3xl rounded-tr-3xl pt-5 px-9">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Shipping Address */}
          <View className="flex-row items-center mb-2 ">
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
              containerClassName=" px-2 py-0"
              inputStyle={styles.addressInput}
            />
          </View>

          {/* Order Summary */}
          <View className="flex-row items-center justify-between mb-4 ">
            <Heading
              level={6}
              className="font-primary-medium text-lg text-primary"
            >
              Order Summary
            </Heading>

            <Button
              label="Edit"
              variant="ghost"
              size="sm"
              textStyle={styles.editButtonText}
              onPress={() => {}}
            />
          </View>

          <View className="flex-row justify-between mb-1 ">
            <View style={styles.flex1}>
              <FlatList
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View className="flex-row gap-2 mb-0.5">
                    <Typography className="font-primary-light text-sm text-primary">
                      {item.name}
                    </Typography>
                    <Typography className="ffont-primary-light text-sm text-secondary">
                      {item.quantity} items
                    </Typography>
                  </View>
                )}
                scrollEnabled={false}
              />
            </View>
            <View className="flex items-center justify-center">
              <Heading
                level={6}
                className="font-primary-medium text-xl text-primary"
              >
                ${total.toFixed(2)}
              </Heading>
            </View>
          </View>

          {/* Divider */}

          <Divider classname="mb-4 " />

          {/* Payment Method */}
          <View className="flex-row items-center justify-between mb-3">
            <Heading
              level={6}
              className="font-primary-medium text-lg text-primary"
            >
              Payment Method
            </Heading>

            <Button
              label="Edit"
              variant="ghost"
              size="sm"
              textStyle={styles.editButtonText}
              onPress={() => {}}
            />
          </View>
          <View className="flex-row items-center gap-2.5 mb-6">
            <CardIcon width={32} height={24} />
            <Typography className="font-primary-light text-sm text-primary">
              Credit Card
            </Typography>
            <Typography className="font-primary-light text-sm text-primary flex-1 text-right">
              {MOCK_PAYMENT_CARD}
            </Typography>
          </View>

          {/* Divider */}

          <Divider classname="mb-4 " />

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

          <Divider classname="mb-4 px-9" />
        </ScrollView>
        {/* Pay Now */}
        <View
          style={{
            paddingBottom: insets.bottom + 32,
          }}
        >
          <Button
            label="Place Order"
            variant="ghost"
            size="lg"
            textStyle={styles.placeOrderText}
            onPress={handlePayNow}
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  addressInput: { padding: 0, fontSize: 13, color: '#222' },
  editButtonText: { fontSize: 12, fontFamily: 'primary' },
  flex1: { flex: 1 },
  placeOrderText: { fontFamily: 'primary', fontSize: 24 },
});

export default PaymentScreen;

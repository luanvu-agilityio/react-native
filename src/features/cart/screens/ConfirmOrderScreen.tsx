import { useState, useCallback, useMemo, useEffect } from 'react';
import { View, FlatList, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Pencil } from 'lucide-react-native';

// Components
import {
  Heading,
  TextInput,
  Divider,
  Button,
  ScreenLayout,
} from '@components/index';

// Constants
import { MOCK_SHIPPING_ADDRESS } from '../constants';

// Components
import PageHeader from '@components/features/PageHeader';
import { OrderItemRow } from '../components';

// Stores
import { useCartStore } from '@store/cartStore';
import { toast } from '@components/Toast';
import { TOAST_MESSAGES } from '@constants/message';

// Types
import { CheckoutNav } from '@app-types/api';
import SummaryRow from '../components/SummaryRow';
import { useDeviceType } from '@hooks/useDeviceType';

const ConfirmOrderScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<CheckoutNav>();
  const { isTablet } = useDeviceType();
  const items = useCartStore(s => s.items);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const removeItem = useCartStore(s => s.removeItem);

  const handleRemoveItem = useCallback(
    (cartKey: string) => {
      removeItem(cartKey);
      toast.info(TOAST_MESSAGES.itemRemovedMessage);
    },
    [removeItem],
  );
  const getSubtotal = useCartStore(s => s.getSubtotal);
  const getTaxAndFees = useCartStore(s => s.getTaxAndFees);
  const getDelivery = useCartStore(s => s.getDelivery);
  const getTotal = useCartStore(s => s.getTotal);

  const subtotal = useMemo(() => getSubtotal(), [getSubtotal]);
  const taxAndFees = useMemo(() => getTaxAndFees(), [getTaxAndFees]);
  const delivery = useMemo(() => getDelivery(), [getDelivery]);
  const total = useMemo(() => getTotal(), [getTotal]);

  useEffect(() => {
    if (items.length === 0) {
      navigation.navigate('HomeStack', { screen: 'Home' });
    }
  }, [items.length, navigation]);

  const handleGoBack = () => navigation.goBack();
  const handlePlaceOrder = () => navigation.navigate('Payment');
  const [address, setAddress] = useState(MOCK_SHIPPING_ADDRESS);

  const renderOrderItem = useCallback(
    ({ item }: { item: (typeof items)[0] }) => (
      <OrderItemRow
        item={item}
        onRemove={handleRemoveItem}
        onQuantityChange={updateQuantity}
      />
    ),
    [handleRemoveItem, updateQuantity],
  );

  const listHeader = (
    <View>
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
          containerClassName=" px-2 py-0"
          inputStyle={styles.addressInput}
        />
      </View>

      {/* Order Summary header */}
      <View className="flex-row items-center justify-between mb-4 ">
        <Heading level={6} className="font-primary-medium text-lg text-primary">
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

      <Divider classname="mb-4 " />
    </View>
  );

  const listFooter = (
    <View className="mt-2 ">
      <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />

      <SummaryRow label="Tax and Fees" value={`$${taxAndFees.toFixed(2)}`} />

      <SummaryRow
        label="Delivery"
        value={`$${delivery.toFixed(2)}`}
        className="mb-3.5"
      />

      <Divider style="dashed" classname="mb-3.5" />

      <SummaryRow
        label="Total"
        value={`$${total.toFixed(2)}`}
        isHeading
        className="mb-10"
      />
    </View>
  );

  return (
    <ScreenLayout extendBackgroundToNav={true}>
      {/* Header */}
      <PageHeader title="Confirm Order" onBack={handleGoBack} />

      {/* Body */}
      {isTablet ? (
        /* Tablet: two-column layout */
        <View className="relative flex-1 bg-white rounded-tl-3xl rounded-tr-3xl flex-row">
          {/* Left column: shipping address + items list */}
          <View className="flex-1 pt-5">
            <FlatList
              data={items}
              keyExtractor={item => item.cartKey}
              renderItem={renderOrderItem}
              ListHeaderComponent={
                <View>
                  <View className="flex-row items-center mb-2">
                    <Heading
                      level={4}
                      className="font-primary-bold text-2xl text-dark"
                    >
                      Shipping Address
                    </Heading>
                    <Pressable
                      className="ml-2"
                      style={({ pressed }) =>
                        pressed ? { opacity: 0.7 } : undefined
                      }
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
                  <View className="flex-row items-center justify-between mb-4">
                    <Heading
                      level={6}
                      className="font-primary-medium text-lg text-primary"
                    >
                      Order Items
                    </Heading>
                    <Button
                      label="Edit"
                      variant="ghost"
                      size="sm"
                      textStyle={styles.editButtonText}
                      onPress={() => {}}
                    />
                  </View>
                  <Divider classname="mb-4" />
                </View>
              }
              showsVerticalScrollIndicator={false}
              className="flex-1 px-6"
            />
          </View>

          {/* Vertical divider */}
          <View style={styles.tabletDivider} />

          {/* Right column: order summary + place order */}
          <View className="pt-5" style={styles.tabletSummaryPanel}>
            <View className="flex-row items-center justify-between mb-4 px-6">
              <Heading
                level={6}
                className="font-primary-medium text-lg text-primary"
              >
                Order Summary
              </Heading>
            </View>
            <Divider classname="mb-4" />
            <View className="px-6">
              <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <SummaryRow
                label="Tax and Fees"
                value={`$${taxAndFees.toFixed(2)}`}
              />
              <SummaryRow
                label="Delivery"
                value={`$${delivery.toFixed(2)}`}
                className="mb-3.5"
              />
              <Divider style="dashed" classname="mb-3.5" />
              <SummaryRow
                label="Total"
                value={`$${total.toFixed(2)}`}
                isHeading
                className="mb-10"
              />
            </View>
            <View style={{ paddingBottom: insets.bottom + 32 }}>
              <Button
                label="Place Order"
                variant="ghost"
                size="lg"
                textStyle={styles.placeOrderText}
                onPress={handlePlaceOrder}
              />
            </View>
          </View>
        </View>
      ) : (
        /* Phone: single-column layout */
        <View className="relative flex-1 bg-white rounded-tl-3xl rounded-tr-3xl  pt-5">
          <FlatList
            data={items}
            keyExtractor={item => item.cartKey}
            renderItem={renderOrderItem}
            ListHeaderComponent={listHeader}
            ListFooterComponent={listFooter}
            showsVerticalScrollIndicator={false}
            className="flex-1 px-9"
          />

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
              onPress={handlePlaceOrder}
            />
          </View>
        </View>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  addressInput: { padding: 0, fontSize: 13, color: '#222' },
  editButtonText: { fontSize: 12, fontFamily: 'primary' },
  placeOrderText: { fontFamily: 'primary', fontSize: 24 },
  tabletDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: 16,
  },
  tabletSummaryPanel: { width: 300 },
});

export default ConfirmOrderScreen;

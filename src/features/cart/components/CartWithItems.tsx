import { useCallback } from 'react';
import { View, FlatList } from 'react-native';

// Components
import { Typography, Divider, Button } from '@components/index';
import { toast } from '@components/Toast';
import { TOAST_MESSAGES } from '@constants/message';

// Stores
import { useCartStore } from '@store/cartStore';
import { useAuthStore } from '@store/authStore';

// Navigation
import { navigateTo } from '@lib/navigationRef';

// Local components
import CartItemRow from './CartItemRow';
import SummaryRow from './SummaryRow';

const CartWithItems = () => {
  const items = useCartStore(s => s.items);
  const updateQuantity = useCartStore(s => s.updateQuantity);

  const handleQuantityChange = useCallback(
    (cartKey: string, qty: number) => {
      updateQuantity(cartKey, qty);
      if (qty <= 0) {
        toast.info(TOAST_MESSAGES.removedFromCartMessage);
      }
    },
    [updateQuantity],
  );
  const getSubtotal = useCartStore(s => s.getSubtotal);
  const getTaxAndFees = useCartStore(s => s.getTaxAndFees);
  const getDelivery = useCartStore(s => s.getDelivery);
  const getTotal = useCartStore(s => s.getTotal);
  const getItemCount = useCartStore(s => s.getItemCount);
  const closeCart = useCartStore(s => s.closeCart);

  const isAuthenticated = useAuthStore(s => s.isAuthenticated);

  const handleCheckout = () => {
    closeCart();
    if (!isAuthenticated) {
      navigateTo('Auth', undefined);
      return;
    }
    navigateTo('CheckoutStack', { screen: 'ConfirmOrder' });
  };

  return (
    <View className="flex-1">
      <FlatList
        data={items}
        keyExtractor={item => item.cartKey}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-3 px-10 pb-6"
        renderItem={({ item }) => (
          <CartItemRow item={item} onQuantityChange={handleQuantityChange} />
        )}
        ListHeaderComponent={
          <Typography className="font-primary-medium text-xl text-white mb-5 text-center">
            You have {getItemCount()} items in the cart
          </Typography>
        }
        ListFooterComponent={
          <View className="mt-2 ">
            <SummaryRow
              label="Subtotal"
              value={`$${getSubtotal().toFixed(2)}`}
              labelClassName="text-white"
              valueClassName="text-white"
            />

            <SummaryRow
              label="Tax and Fees"
              value={`$${getTaxAndFees().toFixed(2)}`}
              labelClassName="text-white"
              valueClassName="text-white"
            />

            <SummaryRow
              label="Delivery"
              value={`$${getDelivery().toFixed(2)}`}
              labelClassName="text-white"
              valueClassName="text-white"
            />

            <Divider style="dashed" color="yellow" classname=" mt-4 mb-4" />

            <SummaryRow
              label="Total"
              value={`$${getTotal().toFixed(2)}`}
              isHeading
              className="mb-6"
              labelClassName="text-white"
              valueClassName="text-white"
            />

            <Button
              label="Checkout"
              variant="secondary"
              size="md"
              onPress={handleCheckout}
            />
          </View>
        }
      />
    </View>
  );
};

export default CartWithItems;

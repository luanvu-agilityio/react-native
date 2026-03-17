import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import { Typography, ScreenLayout } from '@components/index';

// Stores
import { useCartStore } from '@store/cartStore';

// Types
import { CheckoutScreenProps } from '@app-types/navigation';

// Cart components
import { LoadingAnimation, OrderResult } from '../components';

type Props = CheckoutScreenProps<'OrderConfirmed'>;

const OrderConfirmedScreen = ({ navigation, route }: Props) => {
  const insets = useSafeAreaInsets();
  const success = route.params.success;
  const clearCart = useCartStore(s => s.clearCart);
  const [showResult, setShowResult] = useState(false);

  const handleLoadingFinished = () => {
    if (success) clearCart();
    setShowResult(true);
  };

  const handleTrackOrder = () => navigation.navigate('DeliveryTime');

  return (
    <ScreenLayout extendBackgroundToNav={true} extendBackgroundColor="#F5CB58">
      {showResult ? (
        <View className="flex-1 flex-row items-center justify-center">
          <OrderResult success={success} onTrack={handleTrackOrder} />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <LoadingAnimation onFinished={handleLoadingFinished} />
        </View>
      )}
      <View
        className="absolute left-0 right-0 bottom-14 pt-4 px-6"
        style={{
          paddingBottom: insets.bottom + 32,
        }}
      >
        <Typography className="font-primary-medium text-lg text-primary text-center">
          If you have any questions, please reach out{''}directly to our
          customer support
        </Typography>
      </View>
    </ScreenLayout>
  );
};

export default OrderConfirmedScreen;

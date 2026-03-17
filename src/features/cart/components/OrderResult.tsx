import { View, Pressable } from 'react-native';

// Components
import { Heading, Typography } from '@components/index';

interface OrderResultProps {
  success: boolean;
  onTrack: () => void;
}

const OrderResult = ({ success, onTrack }: OrderResultProps) => (
  <View className="flex-1 items-center justify-center px-10">
    <View className="w-130 h-130 rounded-full border-4 border-secondary items-center justify-center mb-7.5">
      {success ? (
        <Typography className="text-50 text-secondary">✓</Typography>
      ) : (
        <Typography className="text-50 text-secondary">✗</Typography>
      )}
    </View>

    <Heading
      level={4}
      className="font-tertiary-black text-2xl text-primary text-center mb-2.5"
    >
      {success ? 'Order Confirmed!' : 'Order Failed!'}
    </Heading>

    <Typography className="font-primary-medium text-lg text-primary text-center mb-6">
      {success
        ? 'Your order has been placed succesfully'
        : 'Something went wrong. Please try again.'}
    </Typography>

    {success && (
      <>
        <Typography className="font-secondary-medium text-lg text-primary text-center mb-5">
          Delivery by Thu, 29th, 4:00 PM
        </Typography>
        <Pressable
          onPress={onTrack}
          style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
        >
          <Typography className="font-secondary-medium text-xl text-secondary">
            Track my order
          </Typography>
        </Pressable>
      </>
    )}
  </View>
);

export default OrderResult;

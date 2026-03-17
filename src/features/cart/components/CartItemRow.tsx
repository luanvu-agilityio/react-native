import { View, Image } from 'react-native';

// Components
import {
  QuantityController,
  Heading,
  Typography,
  Divider,
} from '@components/index';

// Stores
import { type CartItem } from '@store/cartStore';

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (id: string, qty: number) => void;
}

const CartItemRow = ({ item, onQuantityChange }: CartItemRowProps) => {
  const handleQuantityChange = (qty: number) =>
    onQuantityChange(item.cartKey, qty);

  return (
    <View className="mb-5">
      <View className="flex-row">
        {/* Thumbnail */}
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            className="w-16 h-16 rounded-xl mr-3"
            resizeMode="cover"
          />
        ) : (
          <View
            className="w-16 h-16 rounded-xl mr-3"
            style={{ backgroundColor: item.bgColor }}
          />
        )}

        {/* Content */}
        <View className="flex-1">
          {/* Top row: name + topping */}
          <View className="flex-row justify-between">
            <Heading
              level={6}
              className="font-primary-medium text-lg text-white flex-1 mr-2 mb-2"
              numberOfLines={1}
            >
              {item.name}
            </Heading>
            {item.topping && (
              <Typography className="font-primary-medium text-xs text-white text-right mt-1">
                {item.topping}
              </Typography>
            )}
          </View>

          {/* Bottom row: price + quantity controller */}
          <View className="flex-row items-center justify-between mt-2">
            <Typography className="font-secondary-semibold text-15 text-white mt-1">
              ${item.price.toFixed(2)}
            </Typography>
            <QuantityController
              value={item.quantity}
              onChange={handleQuantityChange}
              min={0}
              size="sm"
            />
          </View>
        </View>
      </View>

      <Divider color="yellow" classname="mt-3" />
    </View>
  );
};

export default CartItemRow;

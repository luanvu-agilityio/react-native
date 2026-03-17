import { View, Image, Pressable, StyleSheet } from 'react-native';
import { Pencil, Trash2 } from 'lucide-react-native';

// Components
import {
  QuantityController,
  Heading,
  Typography,
  Divider,
  Button,
} from '@components/index';

// Stores
import { type CartItem } from '@store/cartStore';

interface OrderItemRowProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, qty: number) => void;
}

const OrderItemRow = ({
  item,
  onRemove,
  onQuantityChange,
}: OrderItemRowProps) => {
  const handleRemove = () => onRemove(item.cartKey);
  const handleQuantityChange = (qty: number) =>
    onQuantityChange(item.cartKey, qty);

  return (
    <View className="mb-5">
      <View className="flex-row">
        {/* Thumbnail  */}
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            className="w-24 h-24 rounded-2xl mr-4"
            resizeMode="cover"
          />
        ) : (
          <View
            className="w-24 h-24 rounded-2xl mr-4"
            style={{ backgroundColor: item.bgColor }}
          />
        )}

        {/* Content */}
        <View className="flex-1 ">
          {/* Row 1*/}
          <View className="flex-row items-start justify-between mb-1 mt-2">
            <Heading
              level={6}
              className="font-primary-medium text-lg text-primary flex-1 mr-2"
              numberOfLines={1}
            >
              {item.name}
            </Heading>
            <Heading
              level={6}
              className="font-primary-medium text-lg text-secondary"
            >
              ${item.price.toFixed(2)}
            </Heading>
          </View>

          {/* Row 2 */}
          <View className="flex-row items-center justify-between mb-2">
            <Typography className="font-primary-light text-sm text-primary">
              {item.topping ?? ''}
            </Typography>
            <Typography className="font-primary-light text-sm text-primary">
              {item.quantity} items
            </Typography>
          </View>

          {/* Row 3 */}
          <View className="flex-row items-center justify-between">
            <View className=" items-center justify-center">
              <Button
                label="Cancel Order"
                variant="ghost"
                size="sm"
                textStyle={styles.cancelButtonText}
                onPress={() => {}}
              />
            </View>
            <View className="flex-row items-center gap-1.5">
              <Pencil size={14} color="#E95322" className="mt-1" />
              <QuantityController
                value={item.quantity}
                onChange={handleQuantityChange}
                min={1}
                size="md"
              />
            </View>
          </View>
        </View>
      </View>

      <Pressable
        onPress={handleRemove}
        className="absolute right-0 top-0"
        style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
      >
        <Trash2 size={18} color="#E95322" />
      </Pressable>

      <Divider classname="mt-4" />
    </View>
  );
};

const styles = StyleSheet.create({
  cancelButtonText: { fontSize: 15, fontFamily: 'primary' },
});

export default OrderItemRow;

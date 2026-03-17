import { View, Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

// Components
import { Heading, Typography } from '@components/index';

interface CartEmptyProps {
  onAdd: () => void;
}

const CartEmpty = ({ onAdd }: CartEmptyProps) => (
  <View className="flex-1 items-center justify-start px-10">
    <Typography className="font-primary-medium text-xl text-white mt-2 ">
      Your cart is empty
    </Typography>
    <View className="flex-1 justify-center items-center mb-10">
      <Pressable
        onPress={onAdd}
        className="w-120 h-120 rounded-50 border-5 border-peach items-center justify-center mb-6"
        style={({ pressed }) => (pressed ? { opacity: 0.8 } : undefined)}
      >
        <Plus size={70} color="#FFDECF" />
      </Pressable>
      <Heading
        level={6}
        className="font-primary-bold text-2xl text-white text-center px-6"
      >
        Want To Add Something?
      </Heading>
    </View>
  </View>
);

export default CartEmpty;

import { View, Pressable, Animated, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Components
import { Heading, Divider } from '@components/index';

// Icons
import ShoppingCartIcon from '@icons/ShoppingCartIcon';

// Stores
import { useCartStore } from '@store/cartStore';

// Cart components
import { CartEmpty, CartWithItems } from '../components';

// Hooks
import useSlideAnimation from '@hooks/useSlideAnimation';

const TABLET_MAX_PANEL = 480;
const PHONE_PANEL_PERCENT = 0.8;

const CartOverlay = () => {
  const insets = useSafeAreaInsets();
  const isOpen = useCartStore(s => s.isCartOpen);
  const closeCart = useCartStore(s => s.closeCart);
  const items = useCartStore(s => s.items);

  const { width: screenWidth } = useWindowDimensions();
  const isTabletDevice = screenWidth >= 768;

  const panelPercent = isTabletDevice
    ? Math.min(TABLET_MAX_PANEL / screenWidth, PHONE_PANEL_PERCENT)
    : PHONE_PANEL_PERCENT;

  const { translateX, panelWidth } = useSlideAnimation(
    isOpen,
    panelPercent,
    280,
  );

  if (!isOpen) return null;

  return (
    <View
      className="absolute inset-0 flex-row z-[1000]"
      pointerEvents="box-none"
    >
      <View
        className="absolute inset-0 bg-black"
        style={{ opacity: 0.04 }}
        pointerEvents="none"
      />

      {/* Left transparent strip */}
      <Pressable
        className="bg-transparent"
        style={{ width: screenWidth - panelWidth }}
        onPress={closeCart}
        accessibilityLabel="Close cart"
        hitSlop={8}
      />

      <Animated.View
        className="overflow-hidden"
        style={{
          width: panelWidth,
          transform: [{ translateX }],
          paddingTop: insets.top,
        }}
      >
        <View className="flex-1 bg-[#E95322] rounded-tl-[56px] rounded-bl-[56px]  overflow-hidden">
          <View className="pb-3 px-10">
            <View className="flex-row items-center justify-center py-2.5 px-5 gap-2.5">
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <ShoppingCartIcon width={24} height={24} color="#E95322" />
              </View>
              <Heading
                level={4}
                className="font-primary-bold text-2xl text-white"
              >
                Cart
              </Heading>
            </View>
            <Divider color="yellow" classname=" mt-8" />
          </View>

          {items.length === 0 ? (
            <CartEmpty onAdd={closeCart} />
          ) : (
            <CartWithItems />
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default CartOverlay;

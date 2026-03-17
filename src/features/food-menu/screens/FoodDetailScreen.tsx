import { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Image, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useCartStore } from '@store/cartStore';
import { toast } from '@components/Toast';
import { TOAST_MESSAGES } from '@constants/message';

// Components
import {
  Heading,
  Typography,
  Badge,
  Button,
  QuantityController,
  RadioController,
  Divider,
  ScreenLayout,
} from '@components/index';

// Icons
import ChevronLeftIcon from '@icons/ChevronLeftIcon';
import FavoriteIcon from '@icons/FavoriteIcon';
import ShoppingCartIcon from '@icons/ShoppingCartIcon';
import StarburstBadge from '@components/StarburstBadge';
import StarIcon from '@icons/StarIcon';

// Constants
import { TOPPING_OPTIONS } from '../constants';
import { PORTION_OPTIONS } from '@features/home/constants/config';

// Hooks
import { useFoodItem } from '../hooks/useFoodItem';
import { FoodDetailScreenSkeleton } from './skeletons';
import { useDeviceType } from '@hooks/useDeviceType';

// Utils
import { apiToppingToToppingOption } from '../utils/mappers';

// Types
import { HomeScreenProps } from '@app-types/navigation';
import { HomeNav } from '@app-types/api';

const FoodDetailScreen = ({ route }: HomeScreenProps<'FoodDetail'>) => {
  const navigation = useNavigation<HomeNav>();
  const {
    name,
    price,
    rating,
    description,
    longDescription,
    bgColor,
    image,
    discount,
    originalPrice,
  } = route.params;

  const [quantity, setQuantity] = useState(1);
  const isPromo = Boolean(discount);

  const { data: foodItemData, isLoading } = useFoodItem(route.params.id);
  const dbToppings = useMemo(
    () => (foodItemData?.data.toppings ?? []).map(apiToppingToToppingOption),
    [foodItemData],
  );
  const radioOptions = isPromo
    ? PORTION_OPTIONS
    : dbToppings.length > 0
    ? dbToppings
    : TOPPING_OPTIONS;
  const radioSectionLabel = isPromo ? 'Personal portion' : 'Toppings';
  const [selectedOption, setSelectedOption] = useState<string>(
    radioOptions[0].value,
  );

  useEffect(() => {
    if (!isPromo && dbToppings.length > 0) {
      setSelectedOption(dbToppings[0].value);
    }
  }, [isPromo, dbToppings]);

  const [isFavorite, setIsFavorite] = useState(false);
  const { isTablet } = useDeviceType();

  const basePrice = parseFloat(price.replace('$', ''));
  const selectedOptionData = radioOptions.find(o => o.value === selectedOption);
  const toppingPrice = selectedOptionData?.price
    ? parseFloat(selectedOptionData.price.replace('$', ''))
    : 0;
  const totalPrice = basePrice + toppingPrice;

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite(prev => !prev);
  }, []);

  const addItem = useCartStore(s => s.addItem);

  const handleAddToCart = useCallback(() => {
    addItem({
      id: route.params.id,
      name,
      price: totalPrice,
      quantity,
      bgColor,
      image: image ?? undefined,
      topping: selectedOptionData?.label,
    });
    toast.success(
      TOAST_MESSAGES.addedToCartTitle,
      TOAST_MESSAGES.addedToCartMessage,
    );
  }, [
    addItem,
    route.params.id,
    name,
    totalPrice,
    quantity,
    bgColor,
    image,
    selectedOptionData,
  ]);

  if (isLoading) {
    return <FoodDetailScreenSkeleton />;
  }

  return (
    <ScreenLayout extendBackgroundToNav={!isTablet}>
      <View className="flex-1 bg-white">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Yellow header */}
          <View className="bg-yellow px-9 pb-14 pt-2 ">
            {/* Header row */}
            <View className="flex-row items-center justify-between ">
              <View className=" flex-row items-center justify-center ">
                {/* Back */}
                <Pressable
                  onPress={handleGoBack}
                  accessibilityRole="button"
                  accessibilityLabel="Go back"
                  hitSlop={12}
                  className="mr-2 mt-1"
                  style={({ pressed }) =>
                    pressed ? { opacity: 0.7 } : undefined
                  }
                >
                  <ChevronLeftIcon width={20} height={20} color="#252525" />
                </Pressable>

                {/* Title */}
                <Heading
                  level={5}
                  className=" text-xl font-primary-medium"
                  numberOfLines={1}
                >
                  {name}
                </Heading>

                {/* Dot */}
                <View className="w-1.5 h-1.5 rounded-full bg-secondary ml-2 mt-1" />
              </View>

              {/* Favorite */}
              <Pressable
                onPress={handleToggleFavorite}
                accessibilityRole="button"
                accessibilityLabel={
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
                hitSlop={8}
                className="w-6 h-6 rounded-full bg-secondary items-center justify-center"
                style={({ pressed }) =>
                  pressed ? { opacity: 0.7 } : undefined
                }
              >
                <FavoriteIcon width={10} height={10} color="#FFFFFF" />
              </Pressable>
            </View>

            <Badge
              label={rating}
              shape="pill"
              style={{ marginLeft: 24 }}
              icon={<StarIcon size={10} color="transparent" fill="#F5CB58" />}
            />
          </View>

          {/* White content card */}
          <View
            className="bg-white rounded-t-30 -mt-8 pt-8 px-9 flex-1 pb-10"
            style={isTablet ? styles.tabletContent : undefined}
          >
            {/* Tablet */}
            <View style={isTablet ? styles.tabletRow : undefined}>
              {/* Food image */}
              <View
                className="relative mb-4"
                style={isTablet ? styles.tabletImageCol : undefined}
              >
                <View
                  className="rounded-2xl overflow-hidden"
                  style={[
                    isTablet
                      ? styles.tabletImageContainer
                      : styles.imageContainer,
                    { backgroundColor: bgColor },
                  ]}
                >
                  {image && (
                    <Image
                      source={{ uri: image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  )}
                </View>
                {isPromo && discount != null && (
                  <View className="absolute -top-7 -right-6">
                    <StarburstBadge label={`-${discount}%`} size={80} />
                  </View>
                )}
              </View>

              {/* Details column */}
              <View style={isTablet ? styles.tabletDetailsCol : undefined}>
                {/* Price + Quantity */}
                <View className="flex-row items-center justify-between  mb-2">
                  <View className="flex-row items-center gap-2">
                    <Heading level={4} className="text-secondary">
                      ${totalPrice.toFixed(2)}
                    </Heading>
                    {isPromo && originalPrice && (
                      <Typography className="text-yellow font-primary-bold text-lg line-through mt-2">
                        {originalPrice}
                      </Typography>
                    )}
                  </View>
                  <QuantityController
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={99}
                    size="lg"
                  />
                </View>

                {/* Divider */}
                <Divider color="default" classname="mb-2" />

                {/* Description */}
                <View className=" mb-3">
                  <Heading
                    level={5}
                    className="mb-1.5 text-primary font-primary-medium text-base"
                  >
                    {description}
                  </Heading>
                  <Typography className="text-primary font-primary-light text-base leading-6">
                    {longDescription ?? 'Delicious and thoughtfully prepared.'}
                  </Typography>
                </View>

                {/* Toppings / Portion */}
                <View className="mb-10">
                  <Heading level={5} className="mb-2">
                    {radioSectionLabel}
                  </Heading>
                  <RadioController
                    options={radioOptions}
                    value={selectedOption}
                    onChange={setSelectedOption}
                  />
                </View>
                {/* Add to Cart CTA */}
                <Button
                  label="Add to Cart"
                  leftIcon={
                    <ShoppingCartIcon width={20} height={20} color="#FFFFFF" />
                  }
                  size="lg"
                  onPress={handleAddToCart}
                  accessibilityLabel="Add to cart"
                  textStyle={styles.textStyle}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 16 },
  imageContainer: { height: 220 },
  cartContainer: { paddingBottom: 16 },
  textStyle: { fontSize: 24 },
  // Tablet-specific
  tabletContent: { paddingHorizontal: 48 },
  tabletRow: { flexDirection: 'row', gap: 32, alignItems: 'flex-start' },
  tabletImageCol: { flex: 1, marginBottom: 0 },
  tabletImageContainer: { height: 400 },
  tabletDetailsCol: { flex: 1 },
});

export default FoodDetailScreen;

import { useState } from 'react';
import type { ReactNode } from 'react';
import { View, Pressable, type PressableProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Components
import { Heading, Typography, TextInput } from '@components/index';

// Icons
import FilterIcon from '@icons/FilterIcon';
import ShoppingCartIcon from '@icons/ShoppingCartIcon';
import NotificationIcon from '@icons/NotificationIcon';
import ProfileIcon from '@icons/ProfileIcon';

// Components
import Badge from '@components/Badge';

// Types
import type { GreetingConfig } from '../../../features/home/types';
import { AppStackParamList } from '@app-types/navigation';

// Store
import { useCartStore } from '@store/cartStore';
import { useProfileStore } from '@store/profileStore';

interface HomeFeatureHeaderProps {
  greeting?: GreetingConfig;
}

interface ActionIconButtonProps extends PressableProps {
  icon: ReactNode;
}

const ActionIconButton = ({ icon, ...props }: ActionIconButtonProps) => (
  <Pressable
    hitSlop={8}
    className="w-9 h-9 rounded-xl bg-gray-light items-center justify-center"
    style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
    {...props}
  >
    {icon}
  </Pressable>
);

const HomeFeatureHeader = ({ greeting }: HomeFeatureHeaderProps) => {
  const [search, setSearch] = useState('');

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const openCart = useCartStore(s => s.openCart);
  const itemCount = useCartStore(s =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const openProfile = useProfileStore(s => s.openProfile);

  return (
    <View className="bg-yellow px-9 pb-7 pt-8">
      {/* Search bar + action icons */}
      <View className="flex-row items-center justify-between gap-x-8 ">
        {/* Search bar */}
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          accessibilityLabel="Search food"
          style={{ flex: 1 }}
          containerClassName="bg-white rounded-full "
          className="flex-1 text-sm text-gray-icon font-primary-medium py-2"
          rightIcon={
            <Pressable
              accessibilityLabel="Filter"
              hitSlop={8}
              className="w-6 h-6 rounded-full bg-secondary items-center justify-center"
              style={({ pressed }) => (pressed ? { opacity: 0.7 } : undefined)}
            >
              <FilterIcon width={12} height={8} color="#ffffff" />
            </Pressable>
          }
        />
        {/* Action icons */}
        <View className="flex-row items-center gap-x-1.5 ">
          <ActionIconButton
            accessibilityLabel={`Shopping cart${
              itemCount > 0 ? `, ${itemCount} items` : ''
            }`}
            icon={
              <View>
                <ShoppingCartIcon width={16} height={16} color="#E95322" />
                {itemCount > 0 && (
                  <Badge
                    label={itemCount > 99 ? '99+' : String(itemCount)}
                    variant="counter"
                    shape="pill"
                    className="absolute -top-2 -right-2 min-w-[14px] h-[14px] px-0.5 justify-center"
                  />
                )}
              </View>
            }
            onPress={() => openCart()}
          />
          <ActionIconButton
            accessibilityLabel="Notifications"
            icon={<NotificationIcon width={16} height={16} color="#252525" />}
            onPress={() =>
              navigation.navigate('HomeStack', { screen: 'ComingSoon' })
            }
          />
          <ActionIconButton
            accessibilityLabel="Profile"
            icon={<ProfileIcon width={16} height={16} color="#252525" />}
            onPress={() => openProfile()}
          />
        </View>
      </View>

      {/* Greeting */}
      {greeting && (
        <View>
          <Heading level={3} className="text-white mb-1">
            {greeting?.title}
          </Heading>
          <Typography
            variant="sm"
            className="text-secondary font-primary-medium mb-4"
          >
            {greeting?.subtitle}
          </Typography>
        </View>
      )}
    </View>
  );
};

export default HomeFeatureHeader;

import { render } from '@testing-library/react-native';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children?: ReactNode }) => children,
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
  createNavigationContainerRef: () => ({ current: null, isReady: () => false }),
  useNavigationState: () => ({ routes: [{ name: 'Home' }], index: 0 }),
}));

import type { HomeScreenProps } from '@app-types/navigation';
import ComingSoonScreen from '../ComingSoonScreen';
import { ReactNode } from 'react';

describe('ComingSoonScreen', () => {
  it('renders and handles navigation prop', () => {
    const navigation = {
      navigate: jest.fn(),
    } as unknown as HomeScreenProps<'ComingSoon'>['navigation'];
    const route = {
      key: 'coming-soon',
      name: 'ComingSoon',
    } as HomeScreenProps<'ComingSoon'>['route'];
    const { toJSON } = render(
      <ComingSoonScreen navigation={navigation} route={route} />,
    );
    expect(toJSON()).toBeTruthy();
  });
});

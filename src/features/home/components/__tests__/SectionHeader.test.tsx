import { render } from '@testing-library/react-native';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  SafeAreaProvider: ({ children }: { children?: React.ReactNode }) => children,
}));

import SectionHeader from '../SectionHeader';

describe('SectionHeader', () => {
  it('renders without crashing without view all', () => {
    const { toJSON } = render(<SectionHeader title="Hello" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders with view all button', () => {
    const { toJSON } = render(
      <SectionHeader title="Hello" onViewAll={() => {}} />,
    );
    expect(toJSON()).toBeTruthy();
  });
});

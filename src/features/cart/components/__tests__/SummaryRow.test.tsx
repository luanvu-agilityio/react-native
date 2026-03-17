import { render } from '@testing-library/react-native';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children?: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

import SummaryRow from '../SummaryRow';

describe('SummaryRow', () => {
  it('renders label and value', () => {
    const { getByText } = render(<SummaryRow label="Sub" value="$10.00" />);
    expect(getByText('Sub')).toBeTruthy();
    expect(getByText('$10.00')).toBeTruthy();
  });

  it('renders heading variant when isHeading is true', () => {
    const { getByText } = render(
      <SummaryRow label="Total" value="$13.00" isHeading />,
    );
    expect(getByText('Total')).toBeTruthy();
    expect(getByText('$13.00')).toBeTruthy();
  });
});

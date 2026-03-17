import { render } from '@testing-library/react-native';
import { Badge } from '../index';

describe('Badge', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Badge label="5.0" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders the label text', () => {
    const { getByText } = render(<Badge label="$103.0" />);
    expect(getByText('$103.0')).toBeTruthy();
  });

  it('has accessibilityRole text', () => {
    const { getAllByRole } = render(<Badge label="5.0" />);
    expect(getAllByRole('text').length).toBeGreaterThan(0);
  });

  it('uses label as accessibilityLabel when showStar is false', () => {
    const { getByLabelText } = render(<Badge label="New" />);
    expect(getByLabelText('New')).toBeTruthy();
  });

  it('uses label + " stars" as accessibilityLabel when showStar is true', () => {
    const { getByLabelText } = render(<Badge label="5.0" showStar />);
    expect(getByLabelText('5.0 stars')).toBeTruthy();
  });

  it('applies pill shape classes by default', () => {
    const { getByLabelText } = render(<Badge label="5.0" />);
    expect(getByLabelText('5.0').props.className).toContain('rounded-full');
  });

  it('applies tag shape classes when shape is tag', () => {
    const { getByLabelText } = render(<Badge label="$103.0" shape="tag" />);
    const className = getByLabelText('$103.0').props.className;
    expect(className).toContain('rounded-l-full');
    expect(className).toContain('rounded-r-none');
  });

  it('does not render star icon when showStar is false', () => {
    const { UNSAFE_queryByProps } = render(<Badge label="5.0" />);
    expect(UNSAFE_queryByProps({ accessibilityLabel: 'star-icon' })).toBeNull();
  });

  it('renders custom icon when icon prop is provided', () => {
    const { View } = require('react-native');
    const CustomIcon = () => <View accessibilityLabel="custom-icon" />;
    const { UNSAFE_queryByProps } = render(
      <Badge label="Tag" icon={<CustomIcon />} />,
    );
    expect(
      UNSAFE_queryByProps({ accessibilityLabel: 'custom-icon' }),
    ).toBeTruthy();
  });

  it('does not render icon when showStar is false and no icon provided', () => {
    const { UNSAFE_queryByProps } = render(
      <Badge label="$103.0" variant="primary" />,
    );
    expect(UNSAFE_queryByProps({ accessibilityLabel: 'star-icon' })).toBeNull();
  });
});

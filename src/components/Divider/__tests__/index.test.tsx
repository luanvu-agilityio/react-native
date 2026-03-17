import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import { Divider } from '../index';

describe('Divider', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON()).toBeTruthy();
  });

  it('is hidden from accessibility tree', () => {
    const { UNSAFE_getByType } = render(<Divider />);
    const el = UNSAFE_getByType(View);
    expect(el.props.accessible).toBe(false);
    expect(el.props.accessibilityElementsHidden).toBe(true);
  });

  it('renders with default color and solid style by default', () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders yellow solid variant', () => {
    const { toJSON } = render(<Divider color="yellow" style="solid" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders white solid variant', () => {
    const { toJSON } = render(<Divider color="white" style="solid" />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders white dashed variant', () => {
    const { toJSON } = render(<Divider color="white" style="dashed" />);
    expect(toJSON()).toBeTruthy();
  });
});

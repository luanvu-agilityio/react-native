import { render, fireEvent } from '@testing-library/react-native';
import OrderResult from '../OrderResult';

describe('OrderResult', () => {
  it('shows confirmed state and calls onTrack when pressed', () => {
    const onTrack = jest.fn();
    const { getByText } = render(<OrderResult success onTrack={onTrack} />);
    expect(getByText('Order Confirmed!')).toBeTruthy();
    const track = getByText('Track my order');
    fireEvent.press(track);
    expect(onTrack).toHaveBeenCalled();
  });

  it('shows failed state', () => {
    const { getByText } = render(
      <OrderResult success={false} onTrack={() => {}} />,
    );
    expect(getByText('Order Failed!')).toBeTruthy();
  });
});

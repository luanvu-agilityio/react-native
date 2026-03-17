import { Text } from 'react-native';
import { render, act } from '@testing-library/react-native';
import useLoadingAnimation from '../useLoadingAnimation';

jest.useFakeTimers();

describe('useLoadingAnimation', () => {
  it('updates dots and calls onFinished after timeout', () => {
    const onFinished = jest.fn();

    const Test = () => {
      const { dots } = useLoadingAnimation(onFinished);
      return <Text>{dots}</Text>;
    };

    const { getByText } = render(<Test />);

    expect(getByText('1')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(getByText('2')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onFinished).toHaveBeenCalled();
  });
});

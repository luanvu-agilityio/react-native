import { Text, Dimensions } from 'react-native';
import { render } from '@testing-library/react-native';
import useSlideAnimation from '../useSlideAnimation';

describe('useSlideAnimation', () => {
  it('returns panelWidth based on window width and percent', () => {
    type DimensionsType = {
      get: (key: 'window' | 'screen') => { width: number; height: number };
    };

    const original = Dimensions.get;
    (Dimensions as unknown as DimensionsType).get = () => ({
      width: 400,
      height: 800,
    });

    const Test = () => {
      const { panelWidth } = useSlideAnimation(false, 0.75);
      return <Text>{panelWidth}</Text>;
    };

    const { getByText } = render(<Test />);
    expect(getByText(String(Math.round(400 * 0.75)))).toBeTruthy();

    (Dimensions as unknown as DimensionsType).get = original;
  });
});

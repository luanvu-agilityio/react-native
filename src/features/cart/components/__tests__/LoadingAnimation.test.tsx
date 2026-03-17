import { render } from '@testing-library/react-native';
import LoadingAnimation from '../LoadingAnimation';

jest.mock('@hooks/useLoadingAnimation', () => ({
  __esModule: true,
  default: () => ({ scaleAnim: 1, opacityAnim: 1, dots: 3 }),
}));

describe('LoadingAnimation', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<LoadingAnimation onFinished={() => {}} />);
    expect(toJSON()).toBeTruthy();
  });
});

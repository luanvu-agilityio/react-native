import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@services/foodItems', () => ({ getFoodItemById: jest.fn() }));

import { getFoodItemById } from '@services/foodItems';
import { useFoodItem } from '../useFoodItem';

const client = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const Wrapper: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;

describe('useFoodItem hook', () => {
  afterEach(() => {
    client.clear();
    jest.clearAllMocks();
  });

  it('returns item data from getFoodItemById', async () => {
    (getFoodItemById as jest.Mock).mockResolvedValueOnce({
      data: { id: '1', name: 'Y' },
    });

    const Test: React.FC = () => {
      const { data, isSuccess } = useFoodItem('1');
      return <Text>{isSuccess && data ? data.data.name : 'loading'}</Text>;
    };

    const { findByText } = render(
      <Wrapper>
        <Test />
      </Wrapper>,
    );

    await expect(findByText('Y')).resolves.toBeTruthy();
  });
});

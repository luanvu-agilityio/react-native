import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@services/foodItems', () => ({ getFoodItems: jest.fn() }));

import { getFoodItems } from '@services/foodItems';
import { useFoodItems } from '../useFoodItems';

const client = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const Wrapper: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({
  children,
}) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;

describe('useFoodItems hook', () => {
  afterEach(() => {
    client.clear();
    jest.clearAllMocks();
  });

  it('returns data from getFoodItems', async () => {
    (getFoodItems as jest.Mock).mockResolvedValueOnce({
      data: [{ id: '1', name: 'X' }],
      total: 1,
    });

    const Test: React.FC = () => {
      const { data, isSuccess } = useFoodItems();
      return <Text>{isSuccess && data ? data.data[0].name : 'loading'}</Text>;
    };

    const { findByText } = render(
      <Wrapper>
        <Test />
      </Wrapper>,
    );

    await expect(findByText('X')).resolves.toBeTruthy();
  });
});

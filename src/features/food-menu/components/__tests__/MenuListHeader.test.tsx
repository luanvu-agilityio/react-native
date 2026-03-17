import { render } from '@testing-library/react-native';
import MenuListHeader from '../MenuListHeader';

jest.mock('@components/features/HomeFeatureHeader', () => () => null);

describe('MenuListHeader', () => {
  it('renders filter button', () => {
    const onCategoryPress = jest.fn();
    const { getByLabelText } = render(
      <MenuListHeader
        activeCategory="snacks"
        onCategoryPress={onCategoryPress}
      />,
    );

    expect(getByLabelText('Filter')).toBeTruthy();
  });
});

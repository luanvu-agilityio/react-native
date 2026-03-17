import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PageHeader from '../index';

describe('PageHeader', () => {
  it('renders title and back button when onBack provided', () => {
    const onBack = jest.fn();
    const { getByRole } = render(
      <PageHeader title="My Title" onBack={onBack} />,
    );

    const back = getByRole('button');
    fireEvent.press(back);
    expect(onBack).toHaveBeenCalled();

    const header = getByRole('header');
    expect(header.props.children).toBe('My Title');
  });

  it('does not render back button when onBack not provided', () => {
    const { queryByRole } = render(<PageHeader title="T" />);
    expect(queryByRole('button')).toBeNull();
  });
});

import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import { Text, Pressable } from 'react-native';
import { FormTextInput } from '../../FormTextInput';

const TestForm = () => {
  const { control, handleSubmit } = useForm<{ field: string }>({
    defaultValues: { field: '' },
  });
  const [submitted, setSubmitted] = React.useState('');

  return (
    <>
      <FormTextInput control={control} name="field" placeholder="Enter" />
      <Pressable
        accessibilityLabel="submit"
        onPress={handleSubmit(d => setSubmitted(d.field))}
      >
        <Text>Submit</Text>
      </Pressable>
      <Text accessibilityLabel="submitted">{submitted}</Text>
    </>
  );
};

describe('FormTextInput', () => {
  it('updates form value via Controller and submits', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <TestForm />,
    );
    const input = getByPlaceholderText('Enter');
    fireEvent.changeText(input, 'hello');
    fireEvent.press(getByText('Submit'));
    await waitFor(() => expect(queryByText('hello')).toBeTruthy());
  });
});

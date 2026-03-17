import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { forwardRef, ReactElement, Ref } from 'react';
import { TextInput as RNTextInput } from 'react-native';

// Components
import { TextInput, type TextInputProps } from '../TextInput';

type FormTextInputProps<T extends FieldValues> = Omit<
  TextInputProps,
  'value' | 'onChangeText' | 'errorMessage'
> & {
  control: Control<T>;
  name: Path<T>;
};

function FormTextInputInner<T extends FieldValues>(
  { control, name, ...rest }: FormTextInputProps<T>,
  ref: React.Ref<RNTextInput>,
) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <TextInput
          ref={ref}
          value={value ?? ''}
          onChangeText={onChange}
          onBlur={onBlur}
          errorMessage={error?.message}
          {...rest}
        />
      )}
    />
  );
}

export const FormTextInput = forwardRef(FormTextInputInner) as <
  T extends FieldValues,
>(
  props: FormTextInputProps<T> & { ref?: Ref<RNTextInput> },
) => ReactElement;

export default FormTextInput;

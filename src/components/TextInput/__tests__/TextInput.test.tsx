import { ReactElement } from 'react';
import { Text, TextInput as RNTextInput } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

// Components
import { TextInput } from '../index';

const noop = () => {};

const render = (ui: ReactElement) => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    renderer = ReactTestRenderer.create(ui);
  });
  return renderer;
};

describe('TextInput', () => {
  it('renders correctly with required props', () => {
    const renderer = render(
      <TextInput value="" onChangeText={noop} placeholder="Enter text" />,
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('renders label when provided', () => {
    const renderer = render(
      <TextInput
        value=""
        onChangeText={noop}
        label="Email"
        placeholder="example@example.com"
      />,
    );
    const texts = renderer.root.findAllByType(Text);
    const labelText = texts.find(t => t.props.children === 'Email');
    expect(labelText).toBeDefined();
  });

  it('filters non-numeric characters when numberOnly is true', () => {
    const onChangeText = jest.fn();
    const renderer = render(
      <TextInput
        value=""
        onChangeText={onChangeText}
        numberOnly
        placeholder="n"
      />,
    );
    const input = renderer.root.findByType(RNTextInput);
    act(() => {
      input.props.onChangeText('12a3');
    });
    expect(onChangeText).toHaveBeenCalledWith('123');
  });

  it('does not render label when not provided', () => {
    const renderer = render(
      <TextInput value="" onChangeText={noop} placeholder="Enter text" />,
    );
    const texts = renderer.root.findAllByType(Text);
    expect(texts.length).toBe(0);
  });

  it('renders error message when provided', () => {
    const renderer = render(
      <TextInput
        value=""
        onChangeText={noop}
        placeholder="Email"
        errorMessage="Invalid email"
      />,
    );
    const texts = renderer.root.findAllByType(Text);
    const errorText = texts.find(t => t.props.children === 'Invalid email');
    expect(errorText).toBeDefined();
  });

  it('does not render error message when not provided', () => {
    const renderer = render(
      <TextInput value="" onChangeText={noop} placeholder="Enter text" />,
    );
    const texts = renderer.root.findAllByType(Text);
    const errorText = texts.find(t => t.props.accessibilityRole === 'alert');
    expect(errorText).toBeUndefined();
  });

  it('calls onChangeText with correct value', () => {
    const onChangeText = jest.fn();
    const renderer = render(
      <TextInput
        value=""
        onChangeText={onChangeText}
        placeholder="Enter text"
      />,
    );
    const input = renderer.root.findByType(RNTextInput);
    act(() => {
      input.props.onChangeText('hello');
    });
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('passes secureTextEntry=true to native input initially', () => {
    const renderer = render(
      <TextInput value="" onChangeText={noop} secureTextEntry />,
    );
    const input = renderer.root.findByType(RNTextInput);
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('shows password toggle button when secureTextEntry is true', () => {
    const renderer = render(
      <TextInput value="password" onChangeText={noop} secureTextEntry />,
    );
    const toggleButton = renderer.root.find(
      node =>
        node.props.accessibilityRole === 'button' &&
        node.props.accessibilityLabel === 'Show password',
    );
    expect(toggleButton).toBeDefined();
  });

  it('toggles secureTextEntry when password toggle is pressed', () => {
    const renderer = render(
      <TextInput value="password" onChangeText={noop} secureTextEntry />,
    );
    const input = renderer.root.findByType(RNTextInput);
    expect(input.props.secureTextEntry).toBe(true);

    const toggleButton = renderer.root.find(
      node =>
        node.props.accessibilityRole === 'button' &&
        node.props.accessibilityLabel === 'Show password',
    );
    act(() => {
      toggleButton.props.onPress();
    });

    expect(input.props.secureTextEntry).toBe(false);
  });

  it('renders left icon when provided', () => {
    const LeftIcon = () => null;
    const renderer = render(
      <TextInput value="" onChangeText={noop} leftIcon={<LeftIcon />} />,
    );
    expect(renderer.root.findByType(LeftIcon)).toBeDefined();
  });

  it('renders right icon when provided (and no secureTextEntry)', () => {
    const RightIcon = () => null;
    const renderer = render(
      <TextInput value="" onChangeText={noop} rightIcon={<RightIcon />} />,
    );
    expect(renderer.root.findByType(RightIcon)).toBeDefined();
  });

  it('passes editable=false to native input', () => {
    const renderer = render(
      <TextInput value="readonly" onChangeText={noop} editable={false} />,
    );
    const input = renderer.root.findByType(RNTextInput);
    expect(input.props.editable).toBe(false);
  });

  it('passes maxLength to native input', () => {
    const renderer = render(
      <TextInput value="" onChangeText={noop} maxLength={20} />,
    );
    const input = renderer.root.findByType(RNTextInput);
    expect(input.props.maxLength).toBe(20);
  });

  it('sets multiline and textAlignVertical=top when multiline is true', () => {
    const renderer = render(
      <TextInput value="" onChangeText={noop} multiline numberOfLines={4} />,
    );
    const input = renderer.root.findByType(RNTextInput);
    expect(input.props.multiline).toBe(true);
    expect(input.props.textAlignVertical).toBe('top');
  });
});

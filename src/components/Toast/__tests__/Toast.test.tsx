import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';
import ToastMessage from 'react-native-toast-message';

import { ToastContent, toast, ToastIcon } from '../index';

jest.mock('react-native-toast-message', () => ({
  __esModule: true,
  default: Object.assign(() => null, {
    show: jest.fn(),
    hide: jest.fn(),
  }),
}));

jest.mock('lucide-react-native', () => {
  const { View } = require('react-native');
  const mockIcon = ({ testID }: { testID?: string }) => (
    <View testID={testID} />
  );

  return {
    CheckCircle: mockIcon,
    XCircle: mockIcon,
    Info: mockIcon,
    X: mockIcon,
  };
});

const noop = () => {};

const render = (ui: React.ReactElement) => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    renderer = ReactTestRenderer.create(ui);
  });
  return renderer;
};

describe('ToastContent', () => {
  it('renders success toast snapshot', () => {
    const renderer = render(
      <ToastContent
        type="success"
        text1="Saved!"
        text2="Your data has been saved."
        onPress={noop}
        hide={noop}
      />,
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('renders error toast snapshot', () => {
    const renderer = render(
      <ToastContent
        type="error"
        text1="Error"
        text2="Something went wrong."
        onPress={noop}
        hide={noop}
      />,
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('renders info toast snapshot', () => {
    const renderer = render(
      <ToastContent
        type="info"
        text1="Info"
        text2="Just so you know."
        onPress={noop}
        hide={noop}
      />,
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('renders text1 only when text2 is not provided', () => {
    const renderer = render(
      <ToastContent type="success" text1="Done!" onPress={noop} hide={noop} />,
    );
    const texts = renderer.root.findAllByType(Text);
    expect(texts).toHaveLength(1);
    expect(texts[0].props.children).toBe('Done!');
  });

  it('renders both text1 and text2 when provided', () => {
    const renderer = render(
      <ToastContent
        type="error"
        text1="Failed"
        text2="Please retry."
        onPress={noop}
        hide={noop}
      />,
    );
    const texts = renderer.root.findAllByType(Text);
    expect(texts).toHaveLength(2);
    expect(texts[0].props.children).toBe('Failed');
    expect(texts[1].props.children).toBe('Please retry.');
  });

  it('renders no Text nodes when neither text1 nor text2 is provided', () => {
    const renderer = render(
      <ToastContent type="info" onPress={noop} hide={noop} />,
    );
    const texts = renderer.root.findAllByType(Text);
    expect(texts).toHaveLength(0);
  });

  it('calls onPress when the toast body is pressed', () => {
    const onPress = jest.fn();
    const renderer = render(
      <ToastContent
        type="success"
        text1="Tap me"
        onPress={onPress}
        hide={noop}
      />,
    );

    const buttons = renderer.root.findAllByProps({
      accessibilityRole: 'alert',
    });
    act(() => {
      buttons[0].props.onPress();
    });
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('calls hide when the dismiss button is pressed', () => {
    const hide = jest.fn();
    const renderer = render(
      <ToastContent type="error" text1="Oops" onPress={noop} hide={hide} />,
    );
    const dismissButton = renderer.root.findByProps({
      accessibilityLabel: 'Dismiss',
    });
    act(() => {
      dismissButton.props.onPress();
    });
    expect(hide).toHaveBeenCalledTimes(1);
  });

  it('has accessibilityRole="alert" on the container', () => {
    const renderer = render(
      <ToastContent type="info" text1="Note" onPress={noop} hide={noop} />,
    );
    const container = renderer.root.findByProps({ accessibilityRole: 'alert' });
    expect(container.props.accessibilityRole).toBe('alert');
  });

  it('builds accessibilityLabel from text1 and text2', () => {
    const renderer = render(
      <ToastContent
        type="success"
        text1="Done"
        text2="All good."
        onPress={noop}
        hide={noop}
      />,
    );
    const container = renderer.root.findByProps({ accessibilityRole: 'alert' });
    expect(container.props.accessibilityLabel).toBe('Done. All good.');
  });

  it('uses only text1 for accessibilityLabel when text2 is absent', () => {
    const renderer = render(
      <ToastContent type="error" text1="Failed" onPress={noop} hide={noop} />,
    );
    const container = renderer.root.findByProps({ accessibilityRole: 'alert' });
    expect(container.props.accessibilityLabel).toBe('Failed');
  });
});

describe('ToastIcon', () => {
  it.each([['success'], ['error'], ['info']] as const)(
    'renders without crashing for type "%s"',
    type => {
      const renderer = render(<ToastIcon type={type} />);
      expect(renderer.toJSON()).not.toBeNull();
    },
  );
});

describe('toast', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('toast.success calls ToastMessage.show with type "success"', () => {
    toast.success('Saved!');
    expect(ToastMessage.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Saved!',
      text2: undefined,
    });
  });

  it('toast.success forwards text2 when provided', () => {
    toast.success('Saved!', 'Your changes are live.');
    expect(ToastMessage.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Saved!',
      text2: 'Your changes are live.',
    });
  });

  it('toast.error calls ToastMessage.show with type "error"', () => {
    toast.error('Failed');
    expect(ToastMessage.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Failed',
      text2: undefined,
    });
  });

  it('toast.error forwards text2 when provided', () => {
    toast.error('Failed', 'Please retry.');
    expect(ToastMessage.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Failed',
      text2: 'Please retry.',
    });
  });

  it('toast.info calls ToastMessage.show with type "info"', () => {
    toast.info('Note');
    expect(ToastMessage.show).toHaveBeenCalledWith({
      type: 'info',
      text1: 'Note',
      text2: undefined,
    });
  });

  it('toast.info forwards text2 when provided', () => {
    toast.info('Note', 'Just a heads up.');
    expect(ToastMessage.show).toHaveBeenCalledWith({
      type: 'info',
      text1: 'Note',
      text2: 'Just a heads up.',
    });
  });

  it('toast.hide calls ToastMessage.hide', () => {
    toast.hide();
    expect(ToastMessage.hide).toHaveBeenCalledTimes(1);
  });
});

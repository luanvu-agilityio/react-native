import { navigateTo, navigationRef } from '../navigationRef';

jest.mock('@react-navigation/native', () => ({
  createNavigationContainerRef: () => ({
    isReady: () => true,
    dispatch: jest.fn(),
  }),
  CommonActions: {
    navigate: (name: string, params?: object) => ({
      type: 'NAVIGATE',
      payload: { name, params },
    }),
  },
}));

describe('navigationRef helpers', () => {
  it('calls dispatch when ready', () => {
    const spy = jest
      .spyOn(navigationRef, 'isReady' as never)
      .mockImplementation(() => true as never);
    const dispatchSpy = jest
      .spyOn(navigationRef, 'dispatch' as never)
      .mockImplementation(jest.fn() as never);
    navigateTo('Home');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    dispatchSpy.mockRestore();
  });
});

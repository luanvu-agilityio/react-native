describe('authClient and AUTH_SERVER_URL', () => {
  const realDev = (global as unknown as { __DEV__: boolean }).__DEV__;

  afterEach(() => {
    jest.resetModules();
    (global as unknown as { __DEV__: boolean }).__DEV__ = realDev;
  });

  it('uses Android emulator host when Platform.OS === "android" and __DEV__ true', () => {
    jest.resetModules();
    (global as unknown as { __DEV__: boolean }).__DEV__ = true;
    jest.doMock('react-native', () => ({ Platform: { OS: 'android' } }));
    jest.doMock('better-auth/client', () => ({
      createAuthClient: (opts: { baseURL: string }) => ({
        baseURL: opts.baseURL,
      }),
    }));

    jest.isolateModules(() => {
      const mod = require('../authClient');
      expect(mod.AUTH_SERVER_URL).toBe('http://10.0.2.2:3000');
      expect(mod.authClient).toBeDefined();
      expect((mod.authClient as unknown as { baseURL: string }).baseURL).toBe(
        mod.AUTH_SERVER_URL,
      );
    });
  });

  it('uses production URL when __DEV__ is false', () => {
    jest.resetModules();
    (global as unknown as { __DEV__: boolean }).__DEV__ = false;
    jest.doMock('react-native', () => ({ Platform: { OS: 'ios' } }));
    jest.doMock('better-auth/client', () => ({
      createAuthClient: (opts: { baseURL: string }) => ({
        baseURL: opts.baseURL,
      }),
    }));

    jest.isolateModules(() => {
      const mod = require('../authClient');
      expect(mod.AUTH_SERVER_URL).toBe('https://api.yumquick.app');
      expect((mod.authClient as unknown as { baseURL: string }).baseURL).toBe(
        mod.AUTH_SERVER_URL,
      );
    });
  });
});

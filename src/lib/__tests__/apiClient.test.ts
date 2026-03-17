jest.mock('@store/authStore', () => ({
  useAuthStore: { getState: () => ({ token: undefined }) },
}));
jest.mock('better-auth/client', () => ({ createAuthClient: () => ({}) }));

import { apiClient, ApiError } from '../apiClient';

const globalFetch = global as unknown as {
  fetch: (...args: unknown[]) => Promise<Response>;
};

describe('ApiClient', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('throws ApiError on non-ok response with json message', async () => {
    const fetchMock = jest.spyOn(globalFetch, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => ({ message: 'bad token' }),
    } as unknown as Response);

    await expect(apiClient.get('/x')).rejects.toMatchObject({
      status: 401,
      message: 'bad token',
    });

    fetchMock.mockRestore();
  });

  it('throws ApiError with statusText when json fails', async () => {
    const fetchMock = jest.spyOn(globalFetch, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Server',
      json: async () => {
        throw new Error('invalid json');
      },
    } as unknown as Response);

    await expect(apiClient.get('/y')).rejects.toMatchObject({
      status: 500,
      message: 'Server',
    });

    fetchMock.mockRestore();
  });

  it('returns parsed json on success', async () => {
    const payload = { hello: 'world' };
    const fetchMock = jest.spyOn(globalFetch, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => payload,
    } as unknown as Response);

    const result = await apiClient.get('/ok');
    expect(result).toEqual(payload);

    fetchMock.mockRestore();
  });

  it('post/patch/delete send correct method and body', async () => {
    const fetchMock = jest.spyOn(globalFetch, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as unknown as Response);

    await apiClient.post('/p', { a: 1 });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/p'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ a: 1 }),
      }),
    );

    await apiClient.patch('/p', { b: 2 });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/p'),
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ b: 2 }),
      }),
    );

    await apiClient.delete('/p');
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/p'),
      expect.objectContaining({ method: 'DELETE' }),
    );

    fetchMock.mockRestore();
  });

  it('ApiError has status and name set', () => {
    const err = new ApiError(418, 'teapot');
    expect(err.status).toBe(418);
    expect(err.name).toBe('ApiError');
    expect(err.message).toBe('teapot');
  });

  it('includes Authorization header when token present', async () => {
    jest.resetModules();
    jest.doMock('@store/authStore', () => ({
      useAuthStore: { getState: () => ({ token: 'tok-123' }) },
    }));
    jest.isolateModules(() => {
      const { apiClient: client } = require('../apiClient');

      const fetchMock = jest.spyOn(globalFetch, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ok: true }),
      } as unknown as Response);

      return client.get('/auth').then(() => {
        const calledWith = (
          fetchMock.mock.calls[0] as unknown[]
        )[1] as RequestInit;
        expect(calledWith.headers).toMatchObject({
          Authorization: 'Bearer tok-123',
        });
        fetchMock.mockRestore();
      });
    });
  });
});

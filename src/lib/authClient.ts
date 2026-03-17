import { createAuthClient } from 'better-auth/client';
import { Platform } from 'react-native';

/**
 * Base URL of the Hono API server.
 *
 * Development
 *   Android emulator  → 10.0.2.2  (maps to host-machine localhost)
 *   iOS simulator     → localhost
 */
const DEV_LOCAL_HOST =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const PRODUCTION_API_URL = process.env.PRODUCTION_API_URL;

export const AUTH_SERVER_URL = __DEV__ ? DEV_LOCAL_HOST : PRODUCTION_API_URL;

export const authClient = createAuthClient({
  baseURL: AUTH_SERVER_URL,
  fetchOptions: {
    headers: { Origin: AUTH_SERVER_URL },
  },
});

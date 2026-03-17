import { createAuthClient } from 'better-auth/client';
import { Platform } from 'react-native';

/**
 * Base URL of the Hono API server.
 *
 * Development
 *   Android emulator  → 10.0.2.2  (maps to host-machine localhost)
 *   iOS simulator     → localhost
 *   Physical device   → set DEV_LOCAL_HOST to your machine's LAN IP, e.g. http://192.168.1.x:3000
 *
 * Production (release build)
 *   Set PRODUCTION_API_URL to your deployed Render URL before building the APK,
 *   e.g. https://yumquick-api.onrender.com
 */
const DEV_LOCAL_HOST =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const PRODUCTION_API_URL = 'https://yumquick-api.onrender.com'; // ← update after Render deploy

export const AUTH_SERVER_URL = __DEV__ ? DEV_LOCAL_HOST : PRODUCTION_API_URL;

export const authClient = createAuthClient({
  baseURL: AUTH_SERVER_URL,
  fetchOptions: {
    headers: { Origin: AUTH_SERVER_URL },
  },
});

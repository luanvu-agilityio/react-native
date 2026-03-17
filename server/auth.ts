import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer } from 'better-auth/plugins';
import { db } from './db';
import * as schema from '../db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),

  emailAndPassword: { enabled: true },

  user: {
    additionalFields: {
      phone: {
        type: 'string',
        required: false,
        defaultValue: null,
        input: true,
      },
    },
  },

  plugins: [bearer()],

  trustedOrigins: [
    'http://10.0.2.2:3000', // Android emulator → host machine
    'http://localhost:3000', // iOS simulator / local dev
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
  ],

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
});

export type Auth = typeof auth;

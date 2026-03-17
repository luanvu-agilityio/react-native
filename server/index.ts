import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { auth } from './auth';
import { categoriesRouter } from './routes/categories';
import { foodItemsRouter } from './routes/foodItems';
import { promoBannersRouter } from './routes/promoBanners';

const PORT = Number(process.env.PORT ?? 3000);

const app = new Hono();

// CORS
app.use(
  cors({
    origin: origin => origin,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposeHeaders: ['Set-Cookie'],
  }),
);

// Better Auth
app.on(['GET', 'POST'], '/api/auth/**', c => auth.handler(c.req.raw));

// Health check
app.get('/health', c =>
  c.json({ ok: true, timestamp: new Date().toISOString() }),
);

// Root info — provide a simple overview at `/`
app.get('/', c =>
  c.json({
    ok: true,
    server: 'YumQuick',
    routes: ['/health', '/api/categories'],
  }),
);

// API routes
app.route('/api/categories', categoriesRouter);
app.route('/api/food-items', foodItemsRouter);
app.route('/api/promo-banners', promoBannersRouter);

// Start
serve({ fetch: app.fetch, port: PORT, hostname: '0.0.0.0' }, () => {
  console.log(`\n✓ YumQuick auth server running\n`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Android: http://10.0.2.2:${PORT}\n`);
});

import { Hono } from 'hono';
import { db } from '../db';
import { categories } from '../../db/schema';
import { asc } from 'drizzle-orm';

export const categoriesRouter = new Hono();

// GET /api/categories
categoriesRouter.get('/', async c => {
  const rows = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.sortOrder));

  return c.json({ data: rows, total: rows.length });
});

import { Hono } from 'hono';
import { db } from '../db';
import {
  foodItems,
  toppingOptions,
  foodItemToppingOptions,
} from '../../db/schema';
import { and, asc, desc, eq, inArray, type SQL } from 'drizzle-orm';

export const foodItemsRouter = new Hono();

// GET /api/food-items
foodItemsRouter.get('/', async c => {
  const categoryId = c.req.query('categoryId');
  const isBestSeller = c.req.query('isBestSeller');
  const isRecommended = c.req.query('isRecommended');
  const limit = c.req.query('limit') ?? '20';
  const offset = c.req.query('offset') ?? '0';

  const conditions: SQL[] = [];

  if (categoryId) {
    conditions.push(eq(foodItems.categoryId, categoryId));
  }
  if (isBestSeller === 'true') {
    conditions.push(eq(foodItems.isBestSeller, true));
  }
  if (isRecommended === 'true') {
    conditions.push(eq(foodItems.isRecommended, true));
  }

  conditions.push(eq(foodItems.isAvailable, true));

  const rows = await db
    .select()
    .from(foodItems)
    .where(and(...conditions))
    .orderBy(desc(foodItems.isBestSeller), asc(foodItems.name))
    .limit(Number(limit))
    .offset(Number(offset));

  return c.json({ data: rows, total: rows.length });
});

// GET /api/food-items/:id
foodItemsRouter.get('/:id', async c => {
  const id = c.req.param('id');

  const [item] = await db
    .select()
    .from(foodItems)
    .where(eq(foodItems.id, id))
    .limit(1);

  if (!item) {
    return c.json({ message: 'Food item not found' }, 404);
  }

  const junctions = await db
    .select({ toppingOptionId: foodItemToppingOptions.toppingOptionId })
    .from(foodItemToppingOptions)
    .where(eq(foodItemToppingOptions.foodItemId, id))
    .orderBy(asc(foodItemToppingOptions.sortOrder));

  const toppingIds = junctions.map(j => j.toppingOptionId);

  const toppings =
    toppingIds.length > 0
      ? await db
          .select()
          .from(toppingOptions)
          .where(inArray(toppingOptions.id, toppingIds))
          .orderBy(asc(toppingOptions.sortOrder))
      : [];

  return c.json({ data: { ...item, toppings } });
});

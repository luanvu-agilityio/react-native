import { Hono } from 'hono';
import { db } from '../db';
import { promoBanners, foodItems } from '../../db/schema';
import { asc, eq } from 'drizzle-orm';

export const promoBannersRouter = new Hono();

// GET /api/promo-banners
promoBannersRouter.get('/', async c => {
  const rows = await db
    .select({
      id: promoBanners.id,
      title: promoBanners.title,
      subtitle: promoBanners.subtitle,
      discount: promoBanners.discount,
      bgColor: promoBanners.bgColor,
      sortOrder: promoBanners.sortOrder,
      isActive: promoBanners.isActive,
      createdAt: promoBanners.createdAt,
      imageUrl: foodItems.imageUrl,
      foodName: foodItems.name,
      foodPrice: foodItems.price,
      foodOriginalPrice: foodItems.originalPrice,
      foodRating: foodItems.rating,
      foodDescription: foodItems.description,
      foodBgColor: foodItems.bgColor,
    })
    .from(promoBanners)
    .leftJoin(foodItems, eq(promoBanners.foodItemId, foodItems.id))
    .where(eq(promoBanners.isActive, true))
    .orderBy(asc(promoBanners.sortOrder));

  return c.json({ data: rows, total: rows.length });
});

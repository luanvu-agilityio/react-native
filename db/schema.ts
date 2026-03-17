import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  numeric,
  check,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// ─── BETTER AUTH ─────────────────────────────────────────

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  phone: text('phone'),
  address: text('address'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ─── CATEGORIES ───────────────────────────────────────────

export const categories = pgTable('categories', {
  id: text('id').primaryKey(), // e.g. 'snacks', 'meal'
  label: text('label').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

// ─── FOOD ITEMS ───────────────────────────────────────────

export const foodItems = pgTable('food_items', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()::TEXT`),
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  price: numeric('price', { precision: 8, scale: 2 }).notNull(),
  originalPrice: numeric('original_price', { precision: 8, scale: 2 }), // set when discount active
  discount: integer('discount'), // percentage e.g. 20
  rating: numeric('rating', { precision: 2, scale: 1 }),
  description: text('description'),
  longDescription: text('long_description'),
  bgColor: text('bg_color'),
  imageUrl: text('image_url'),
  isBestSeller: boolean('is_best_seller').notNull().default(false),
  isRecommended: boolean('is_recommended').notNull().default(false),
  isAvailable: boolean('is_available').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ─── PROMO BANNERS ────────────────────────────────────────

export const promoBanners = pgTable('promo_banners', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()::TEXT`),
  foodItemId: text('food_item_id').references(() => foodItems.id, {
    onDelete: 'set null',
  }),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  discount: integer('discount'),
  bgColor: text('bg_color'),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ─── TOPPING OPTIONS ──────────────────────────────────────

export const toppingOptions = pgTable('topping_options', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()::TEXT`),
  label: text('label').notNull(),
  value: text('value').notNull().unique(), // e.g. 'guacamole'
  price: numeric('price', { precision: 6, scale: 2 }).notNull().default('0'),
  sortOrder: integer('sort_order').notNull().default(0),
});

// ─── FOOD ITEM ↔ TOPPING OPTIONS (junction) ────────────────
//  Controls which toppings are valid for each food item.

export const foodItemToppingOptions = pgTable(
  'food_item_topping_options',
  {
    foodItemId: text('food_item_id')
      .notNull()
      .references(() => foodItems.id, { onDelete: 'cascade' }),
    toppingOptionId: text('topping_option_id')
      .notNull()
      .references(() => toppingOptions.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  t => [primaryKey({ columns: [t.foodItemId, t.toppingOptionId] })],
);

// ─── PORTION OPTIONS ──────────────────────────────────────

export const portionOptions = pgTable('portion_options', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()::TEXT`),
  label: text('label').notNull(),
  value: text('value').notNull().unique(), // e.g. 'personal'
  price: numeric('price', { precision: 6, scale: 2 }).notNull().default('0'),
  sortOrder: integer('sort_order').notNull().default(0),
});

// ─── ORDERS ───────────────────────────────────────────────

export const orders = pgTable('orders', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()::TEXT`),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  status: text('status').notNull().default('pending'),
  // pending | confirmed | preparing | on_the_way | delivered | cancelled
  shippingAddress: text('shipping_address'),
  subtotal: numeric('subtotal', { precision: 10, scale: 2 }).notNull(),
  taxAndFees: numeric('tax_and_fees', { precision: 10, scale: 2 })
    .notNull()
    .default('5.00'),
  deliveryFee: numeric('delivery_fee', { precision: 10, scale: 2 })
    .notNull()
    .default('3.00'),
  total: numeric('total', { precision: 10, scale: 2 }).notNull(),
  placedAt: timestamp('placed_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ─── ORDER ITEMS ──────────────────────────────────────────

export const orderItems = pgTable(
  'order_items',
  {
    id: text('id')
      .primaryKey()
      .default(sql`gen_random_uuid()::TEXT`),
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    foodItemId: text('food_item_id').references(() => foodItems.id, {
      onDelete: 'set null',
    }),
    name: text('name').notNull(), // snapshot
    unitPrice: numeric('unit_price', { precision: 8, scale: 2 }).notNull(),
    quantity: integer('quantity').notNull(),
    topping: text('topping'), // selected topping/portion label
    bgColor: text('bg_color'),
    imageUrl: text('image_url'),
  },
  t => [check('quantity_positive', sql`${t.quantity} > 0`)],
);

// ─── CART ITEMS ───────────────────────────────────────────

export const cartItems = pgTable(
  'cart_items',
  {
    id: text('id')
      .primaryKey()
      .default(sql`gen_random_uuid()::TEXT`),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    foodItemId: text('food_item_id')
      .notNull()
      .references(() => foodItems.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull().default(1),
    topping: text('topping'), // selected topping/portion label
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  t => [check('cart_quantity_positive', sql`${t.quantity} > 0`)],
);

// ─── FAVORITES ────────────────────────────────────────────

export const favorites = pgTable(
  'favorites',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    foodItemId: text('food_item_id')
      .notNull()
      .references(() => foodItems.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  t => [primaryKey({ columns: [t.userId, t.foodItemId] })],
);

// ─── RELATIONS ────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  cartItems: many(cartItems),
  orders: many(orders),
  favorites: many(favorites),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  foodItems: many(foodItems),
}));

export const foodItemsRelations = relations(foodItems, ({ one, many }) => ({
  category: one(categories, {
    fields: [foodItems.categoryId],
    references: [categories.id],
  }),
  promoBanners: many(promoBanners),
  cartItems: many(cartItems),
  orderItems: many(orderItems),
  favorites: many(favorites),
  toppingOptions: many(foodItemToppingOptions),
}));

export const toppingOptionsRelations = relations(
  toppingOptions,
  ({ many }) => ({
    foodItems: many(foodItemToppingOptions),
  }),
);

export const foodItemToppingOptionsRelations = relations(
  foodItemToppingOptions,
  ({ one }) => ({
    foodItem: one(foodItems, {
      fields: [foodItemToppingOptions.foodItemId],
      references: [foodItems.id],
    }),
    toppingOption: one(toppingOptions, {
      fields: [foodItemToppingOptions.toppingOptionId],
      references: [toppingOptions.id],
    }),
  }),
);

export const promoBannersRelations = relations(promoBanners, ({ one }) => ({
  foodItem: one(foodItems, {
    fields: [promoBanners.foodItemId],
    references: [foodItems.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  foodItem: one(foodItems, {
    fields: [orderItems.foodItemId],
    references: [foodItems.id],
  }),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, { fields: [cartItems.userId], references: [users.id] }),
  foodItem: one(foodItems, {
    fields: [cartItems.foodItemId],
    references: [foodItems.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
  foodItem: one(foodItems, {
    fields: [favorites.foodItemId],
    references: [foodItems.id],
  }),
}));

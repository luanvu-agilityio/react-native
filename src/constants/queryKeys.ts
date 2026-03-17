export type FoodItemsParams = {
  categoryId?: string;
  isBestSeller?: boolean;
  isRecommended?: boolean;
  limit?: number;
  offset?: number;
};

export const queryKeys = {
  // Categories
  categories: {
    all: () => ['categories'] as const,
    list: () => ['categories', 'list'] as const,
  },

  //  Food Items
  foodItems: {
    all: () => ['food-items'] as const,
    list: (params?: FoodItemsParams) => ['food-items', 'list', params] as const,
    detail: (id: string) => ['food-items', 'detail', id] as const,
  },

  // Promo Banners
  promoBanners: {
    all: () => ['promo-banners'] as const,
    list: () => ['promo-banners', 'list'] as const,
  },
} as const;

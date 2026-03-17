import { create } from 'zustand';

export interface CartItem {
  id: string;
  cartKey: string;
  name: string;
  price: number;
  quantity: number;
  bgColor: string;
  image?: string;
  topping?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'addedAt' | 'cartKey'>) => void;
  removeItem: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTaxAndFees: () => number;
  getDelivery: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const TAX_AND_FEES = 5.0;
const DELIVERY_FEE = 3.0;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,

  addItem: item => {
    set(state => {
      const cartKey = `${item.id}::${item.topping ?? ''}`;
      const existing = state.items.find(i => i.cartKey === cartKey);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.cartKey === cartKey
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      }
      return {
        items: [...state.items, { ...item, cartKey, addedAt: new Date() }],
      };
    });
  },

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  removeItem: cartKey => {
    set(state => ({
      items: state.items.filter(i => i.cartKey !== cartKey),
    }));
  },

  updateQuantity: (cartKey, quantity) => {
    set(state => ({
      items:
        quantity <= 0
          ? state.items.filter(i => i.cartKey !== cartKey)
          : state.items.map(i =>
              i.cartKey === cartKey ? { ...i, quantity } : i,
            ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  getTaxAndFees: () => TAX_AND_FEES,

  getDelivery: () => DELIVERY_FEE,

  getTotal: () => {
    const { getSubtotal, getTaxAndFees, getDelivery } = get();
    return getSubtotal() + getTaxAndFees() + getDelivery();
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((sum, i) => sum + i.quantity, 0);
  },
}));

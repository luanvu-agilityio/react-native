import { useCartStore, type CartItem } from '../cartStore';

describe('cart store', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isCartOpen: false });
  });

  it('adds items and computes subtotals/totals', () => {
    const item: Omit<CartItem, 'addedAt' | 'cartKey'> = {
      id: 'p1',
      name: 'Pizza',
      price: 10,
      quantity: 2,
      bgColor: '#fff',
    };

    useCartStore.getState().addItem(item);
    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.getSubtotal()).toBe(20);
    expect(state.getItemCount()).toBe(2);
    // subtotal 20 + tax 5 + delivery 3 = 28
    expect(state.getTotal()).toBeCloseTo(28);

    // adding same product increments quantity
    useCartStore.getState().addItem({ ...item, quantity: 1 });
    const updated = useCartStore.getState();
    expect(updated.items[0].quantity).toBe(3);
  });

  it('updates quantity and removes item when quantity <= 0', () => {
    const item: Omit<CartItem, 'addedAt' | 'cartKey'> = {
      id: 'p2',
      name: 'Soda',
      price: 2,
      quantity: 1,
      bgColor: '#000',
    };
    useCartStore.getState().addItem(item);
    const state = useCartStore.getState();
    const cartKey = state.items[0].cartKey;

    useCartStore.getState().updateQuantity(cartKey, 3);
    expect(useCartStore.getState().items[0].quantity).toBe(3);

    useCartStore.getState().updateQuantity(cartKey, 0);
    expect(
      useCartStore.getState().items.find(i => i.cartKey === cartKey),
    ).toBeUndefined();
  });

  it('opens and closes cart', () => {
    useCartStore.getState().openCart();
    expect(useCartStore.getState().isCartOpen).toBe(true);
    useCartStore.getState().closeCart();
    expect(useCartStore.getState().isCartOpen).toBe(false);
  });

  it('removes an item from the cart', () => {
    const item: Omit<CartItem, 'addedAt' | 'cartKey'> = {
      id: 'p3',
      name: 'Burger',
      price: 8,
      quantity: 1,
      bgColor: '#ccc',
    };
    useCartStore.getState().addItem(item);
    const cartKey = useCartStore.getState().items[0].cartKey;
    useCartStore.getState().removeItem(cartKey);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('increments quantity for an existing item among multiple items', () => {
    const baseItem = {
      id: 'p4',
      name: 'Fries',
      price: 3,
      quantity: 1,
      bgColor: '#ff0',
    };
    const otherItem = {
      id: 'p5',
      name: 'Cola',
      price: 2,
      quantity: 1,
      bgColor: '#f00',
    };
    useCartStore.getState().addItem(baseItem);
    useCartStore.getState().addItem(otherItem);
    expect(useCartStore.getState().items).toHaveLength(2);

    useCartStore.getState().addItem({ ...baseItem, quantity: 2 });
    const state = useCartStore.getState();
    const friesItem = state.items.find(i => i.id === 'p4');
    const colaItem = state.items.find(i => i.id === 'p5');
    expect(friesItem?.quantity).toBe(3);
    expect(colaItem?.quantity).toBe(1);
  });
});

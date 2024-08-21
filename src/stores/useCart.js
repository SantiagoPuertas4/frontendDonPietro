import { create } from 'zustand';

export const useCart = create((set, get) => ({
  items: [],
  addToCart: (product) => {
    const existingItem = get().items.find(item => item.id === product.id);

    if (existingItem) {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === product.id && item.quantity < product.stock
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }));
    } else {
      set((state) => ({
        items: [...state.items, { ...product, quantity: 1 }],
      }));
    }
  },
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },
  updateItemQuantity: (itemId, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      ),
    }));
  },
  clearCart: () => {
    set({ items: [] });
  },
  getCartItem: (itemId) => {
    return get().items.find(item => item.id === itemId);
  },
}));

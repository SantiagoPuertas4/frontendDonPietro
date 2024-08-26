import { create } from "zustand";

export const useCart = create((set, get) => {
  const storedItems = sessionStorage.getItem("cartItems");
  const initialItems = storedItems ? JSON.parse(storedItems) : [];

  return {
    items: initialItems,
    addToCart: (product) => {
      const existingItem = get().items.find((item) => item.id === product.id);

      set((state) => {
        const newItems = existingItem
          ? state.items.map((item) =>
              item.id === product.id && item.quantity < product.stock
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.items, { ...product, quantity: 1 }];

        sessionStorage.setItem("cartItems", JSON.stringify(newItems));

        return { items: newItems };
      });
    },
    removeItem: (itemId) => {
      set((state) => {
        const newItems = state.items.filter((item) => item.id !== itemId);

        sessionStorage.setItem("cartItems", JSON.stringify(newItems));

        return { items: newItems };
      });
    },
    updateItemQuantity: (itemId, quantity) => {
      set((state) => {
        const newItems = state.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );

        sessionStorage.setItem("cartItems", JSON.stringify(newItems));

        return { items: newItems };
      });
    },
    updateItemStock: (itemId, stock) => {
      set((state) => {
        const newItems = state.items.map((item) =>
          item.id === itemId ? { ...item, stock } : item
        );

        sessionStorage.setItem("cartItems", JSON.stringify(newItems));

        return { items: newItems };
      });
    },
    clearCart: () => {
      set({ items: [] });

      sessionStorage.removeItem("cartItems");
    },
    getCartItem: (itemId) => {
      return get().items.find((item) => item.id === itemId);
    },
    getCartTotal: () => {
      return get().items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  };
});

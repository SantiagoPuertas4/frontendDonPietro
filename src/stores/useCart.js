import { create } from 'zustand';

const getInitialCart = () => {
  const storedCart = sessionStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};

export const useCart = create((set) => ({
  items: getInitialCart(),
  
  addToCart: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);
    let updatedItems;

    if (existingItem) {
      updatedItems = state.items.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...state.items, { ...product, quantity: 1 }];
    }

    sessionStorage.setItem('cart', JSON.stringify(updatedItems));
    return { items: updatedItems };
  }),

  clearCart: () => {
    sessionStorage.removeItem('cart');
    set({ items: [] });
  },
}));


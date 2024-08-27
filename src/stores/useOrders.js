import { create } from "zustand";

export const useOrders = create((set, get) => ({
  orders: JSON.parse(sessionStorage.getItem("orders")) || [],
  addOrder: (order) => {
    const updatedOrders = [...get().orders, order];
    sessionStorage.setItem("orders", JSON.stringify(updatedOrders));
    set({ orders: updatedOrders });
  },
  clearOrders: () => {
    sessionStorage.removeItem("orders");
    set({ orders: [] });
  },
}));

import { create } from "zustand";

import { decodeJWT } from "../utilities/decodeJWT";

let user = null;
let isLoggedIn = false;
let tableNumber = sessionStorage.getItem("tableNumber") || null;

const token = sessionStorage.getItem("token");
if (token) {
  user = decodeJWT(token).user;
  isLoggedIn = true;
}

export const useSession = create((set) => ({
  user,
  isLoggedIn,
  tableNumber,
  login: (newUser) => {
    set({ user: newUser, isLoggedIn: true, tableNumber: null });
  },
  logout: () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("tableNumber");
    set({ user: null, isLoggedIn: false, tableNumber: null });
  },
  setTableNumber: (number) => {
    sessionStorage.setItem("tableNumber", number);
    set({ tableNumber: number });
  },
}));

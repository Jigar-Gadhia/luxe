import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: "Confirmed" | "Processing" | "Shipped" | "Delivered";
}

export interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

interface OrderState {
  orders: Order[];
  contactDetails: ContactDetails | null;
  addOrder: (order: Order) => void;
  updateContactDetails: (details: ContactDetails) => void;
  clearHistory: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      contactDetails: null,
      addOrder: (order) => 
        set((state) => ({ orders: [order, ...state.orders] })),
      updateContactDetails: (details) => 
        set({ contactDetails: details }),
      clearHistory: () => set({ orders: [], contactDetails: null }),
    }),
    {
      name: "luxe-orders",
    }
  )
);

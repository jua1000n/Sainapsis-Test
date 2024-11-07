import { Order } from "@/types/Order";
import { create } from "zustand";

type Store = {
  orders: Order[]; // Lista de órdenes
  addOrder: (order: Order) => void; // Función para actualizar las órdenes
};

const useStore = create<Store>((set) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
}));

export default useStore;

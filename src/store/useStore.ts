import { Order } from "@/types/Order";
import { create } from "zustand";
import { OrderState } from "@/types/OrderState";
import { OrderStatusHistory } from "@/types/OrderStatusHistory";

type Store = {
  orders: Order[]; // Lista de órdenes
  orderStatusHistory: OrderStatusHistory[]; // Lista del historial de estado de las órdenes
  addOrder: (order: Order) => void; // Función para actualizar las órdenes
  addOrderStatusHistory: (orderStatusHistory: OrderStatusHistory) => void; // Función para actualizar el historial de estado de las órdenes
  updateOrderState: (orderId: string, newState: OrderState) => void; // FUncion para actualizar el estado
};

const useStore = create<Store>((set) => ({
  orders: [
    {
      id: "6b11e00c-5f97-43bd-ae18-d50f1e41a9c5",
      amount: 100,
      currentState: OrderState.Pending,
      creationDate: new Date(),
      customer: {
        name: "Juan",
        email: "juan@example.com",
      },
      productDetails: [
        {
          name: "Product 1",
          quantity: 2,
          unitPrice: 50,
        },
        {
          name: "Product 2",
          quantity: 1,
          unitPrice: 75,
        },
      ],
      notes: "Some notes",
    },
    {
      id: "d16c3bde-3abf-497b-8e6a-b3d92bd58141",
      amount: 1100,
      currentState: OrderState.Pending,
      creationDate: new Date(),
      customer: {
        name: "Laura",
        email: "laura@example.com",
      },
      productDetails: [
        {
          name: "Product 1",
          quantity: 2,
          unitPrice: 50,
        },
        {
          name: "Product 2",
          quantity: 1,
          unitPrice: 450,
        },
      ],
      notes: "Some notes",
    },
    {
      id: "0a412d20-44de-4c74-9bd0-7dd93b1501ce",
      amount: 500,
      currentState: OrderState.Pending,
      creationDate: new Date(),
      customer: {
        name: "Laura",
        email: "laura@example.com",
      },
      productDetails: [
        {
          name: "Product 1",
          quantity: 2,
          unitPrice: 50,
        },
        {
          name: "Product 2",
          quantity: 1,
          unitPrice: 450,
        },
      ],
      notes: "Some notes",
    },
    {
      id: "b0637395-21a6-44d4-a6ef-7eab30442401",
      amount: 500,
      currentState: OrderState.Pending,
      creationDate: new Date(),
      customer: {
        name: "Laura",
        email: "laura@example.com",
      },
      productDetails: [
        {
          name: "Product 1",
          quantity: 2,
          unitPrice: 50,
        },
        {
          name: "Product 2",
          quantity: 1,
          unitPrice: 450,
        },
      ],
      notes: "Some notes",
    },
  ],
  orderStatusHistory: [
    {
      orderId: "6b11e00c-5f97-43bd-ae18-d50f1e41a9c5",
      previewState: null,
      currentState: OrderState.Pending,
      date: new Date(),
    },
    {
      orderId: "d16c3bde-3abf-497b-8e6a-b3d92bd58141",
      previewState: null,
      currentState: OrderState.Pending,
      date: new Date(),
    },
    {
      orderId: "0a412d20-44de-4c74-9bd0-7dd93b1501ce",
      previewState: null,
      currentState: OrderState.Pending,
      date: new Date(),
    },
    {
      orderId: "b0637395-21a6-44d4-a6ef-7eab30442401",
      previewState: null,
      currentState: OrderState.Pending,
      date: new Date(),
    },
  ],
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  addOrderStatusHistory: (orderStatusHistory) =>
    set((state) => ({
      orderStatusHistory: [orderStatusHistory, ...state.orderStatusHistory],
    })),
  updateOrderState: (id: string, newState: OrderState) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, currentState: newState } : order
      ),
    })),
}));

export default useStore;

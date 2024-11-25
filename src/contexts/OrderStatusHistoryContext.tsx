import { OrderStatusHistory } from "@/types/OrderStatusHistory";
import { API_BASE_URL } from "@/utils/config";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface OrderStatusHistoryContextType {
  orderStatusHistory: OrderStatusHistory[];
  updateOrderStatusHistory: () => void;
}

export const OrderStatusHistoryContext = createContext<
  OrderStatusHistoryContextType | undefined
>(undefined);

interface OrderStatusHistoryProviderProps {
  children: ReactNode;
}

export const OrderStatusHistoryProvider: React.FC<
  OrderStatusHistoryProviderProps
> = ({ children }) => {
  const [orderStatusHistory, setOrderStatusHistory] = useState<
    OrderStatusHistory[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}order-status-history/order-status-histories/`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setOrderStatusHistory(data.reverse());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatusHistory = () => {
    fetchData();
  };

  return (
    <OrderStatusHistoryContext.Provider
      value={{ orderStatusHistory, updateOrderStatusHistory }}
    >
      {children}
    </OrderStatusHistoryContext.Provider>
  );
};

import { Order } from "@/types/Order";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import { OrderState } from "@/types/OrderState";

export const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const updateOrderState = async (orderId: string, newState: OrderState) => {
    try {
      const url =
        newState === OrderState.Canceled
          ? `${API_BASE_URL}order/${orderId}/cancel/`
          : `${API_BASE_URL}order/${orderId}/next-state/`;
      const response = await fetch(url, { method: "PATCH" });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: Order = await response.json();
      setOrders((prevOrders) => {
        return prevOrders.map((order) =>
          order.id === data.id ? { ...order, ...data } : order
        );
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}order/orders/`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data.reverse());
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { orders, orderError: error, orderLoading: loading, updateOrderState };
};

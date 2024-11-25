import { useState } from "react";
import { API_BASE_URL } from "../config";
import { Order } from "@/types/Order";
import { useOrderStatusHistory } from "./useOrderStatusHistory";

export const useCreateOrder = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { updateOrderStatusHistory } = useOrderStatusHistory();

  const createOrder = async (order: Order) => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}order/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: Order = await response.json();
      updateOrderStatusHistory();
      return data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, createOrderError: error, createOrderLoading: loading };
};

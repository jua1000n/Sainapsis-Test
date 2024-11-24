import { useContext } from "react";
import {
  OrderStatusHistoryContext,
  OrderStatusHistoryContextType,
} from "@/contexts/OrderStatusHistoryContext";

export const useOrderStatusHistory = (): OrderStatusHistoryContextType => {
  const context = useContext(OrderStatusHistoryContext);
  if (!context) {
    throw new Error("useHistorial must be used within a HistorialProvider");
  }

  return context;
};

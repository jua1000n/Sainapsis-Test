import useStore from "@/store/useStore";
import { OrderStatusHistory } from "@/types/OrderStatusHistory";

export const useOrderStatusHistory = (orderId: string | null = null) => {
  const orderStatusHistory = useStore((state) => state.orderStatusHistory);

  const listOrderStatusHistory = orderStatusHistory
    .filter((history: OrderStatusHistory) => history.orderId === orderId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return { listOrderStatusHistory, orderStatusHistory };
};

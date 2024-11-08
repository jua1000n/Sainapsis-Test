import { OrderState } from "./OrderState";

export interface OrderStatusHistory {
  orderId: string;
  previewState: OrderState | null;
  currentState: OrderState;
  date: Date;
}

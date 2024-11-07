import { OrderState } from "./OrderState";
import { Customer } from "./Customer";
import { ProductDetail } from "./ProductDetail";

export interface Order {
  id: string;
  amount: number;
  currentState: OrderState;
  creationDate: Date;
  customer: Customer;
  productDetails: ProductDetail[];
  notes: string | null;
}

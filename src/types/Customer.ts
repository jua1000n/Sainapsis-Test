import { UUID } from "crypto";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
}

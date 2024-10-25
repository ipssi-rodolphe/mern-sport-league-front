import { User } from "./User";
import { Product } from "./Product";

export interface Rental {
  _id: string;
  startDate: string;
  endDate: string;
  returned: boolean;
  user: User;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

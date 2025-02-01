import { CartItem } from './cart.model';
import { MangaUser, UserAddress } from './manga-user.model';
import { Timestamp } from 'firebase/firestore';

export interface CheckOutData {
  orderItems: CartItem[];
  totalAmount: number;
  orderIBAN: string | undefined;
  orderShippingAddress: Partial<UserAddress> | undefined;
}

export interface MangaOrder extends CheckOutData {
  orderDate: Timestamp;
  user: MangaUser;
}

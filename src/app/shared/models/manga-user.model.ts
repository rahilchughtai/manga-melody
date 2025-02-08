import { CartItem } from './cart.model';
import { MangaItem } from './manga-item.model';

export interface MangaUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  providertype?: string; //google.com / password
  firstName?: string;
  lastName?: string;
  address?: UserAddress;
  favorites?: MangaItem[];
  cart?: CartItem[];
}

export interface UserAddress {
  name: string;
  address: string;
  city: string;
  postalCode: number | null;
  country?: string;
}

export interface CustomAuthError {
  code: string;
  message: string;
}

import { MinimalMangaItemData } from './manga-item.model';

export interface CartFormInformation {
  quantity: number;
  volume: number;
}
export interface CartItem extends CartFormInformation {
  mangaData: MinimalMangaItemData;
  subtotal: number;
}

export interface CheckoutNavigationState {
  cartItems: CartItem[];
}

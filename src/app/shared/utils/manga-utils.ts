import { CartItem, MangaItem } from '../models';

export const createArrayFromInteger = (length: number): number[] =>
  [...Array(length).keys()].map(i => i + 1);

export const MAX_MANGA_ORDER_QUANTITY = 50;

export function getMangaPrice(manga: MangaItem): number {
  const publishingYear = new Date(manga.published.from).getFullYear();
  switch (true) {
    case publishingYear <= 1990:
      return 5.0;
    case publishingYear <= 2000:
      return 6.5;
    case publishingYear <= 2005:
      return 7;
    case publishingYear < 2010:
      return 8;
    case publishingYear <= 2022:
      return 12;
    default:
      return 7;
  }
}

export function calculateTotalAmount(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => total + item.subtotal, 0);
}

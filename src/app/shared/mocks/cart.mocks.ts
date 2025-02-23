import { CartItem } from '../models';
import { mockMangaData } from './manga.mocks';

export const mockCartItem: CartItem = {
  mangaData: mockMangaData,
  quantity: 1,
  volume: 1,
  subtotal: 10,
};

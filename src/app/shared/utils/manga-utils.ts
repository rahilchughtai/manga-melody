import { MangaItem, MinimalMangaItemData } from '../models';

export function minifyMangaData(manga: MangaItem): MinimalMangaItemData {
  const { images, mal_id, published, title, title_english, title_japanese } =
    manga;
  return {
    images,
    mal_id,
    published,
    title,
    title_english,
    title_japanese,
  };
}

export const createArrayFromInteger = (length: number): number[] =>
  [...Array(length).keys()].map(i => i + 1);

export const MAX_MANGA_ORDER_QUANTITY = 50;

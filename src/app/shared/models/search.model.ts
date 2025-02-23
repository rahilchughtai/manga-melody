export type MangaSortMethod = 'asc' | 'desc';

export const ALL_ORDER_BY_SORT_BY_ATTRIBUTES = [
  'mal_id',
  'title',
  'start_date',
  'end_date',
  'chapters',
  'volumes',
  'score',
  'scored_by',
  'rank',
  'popularity',
  'members',
  'favorites',
] as const;

export const ALL_MANGA_STATUS = [
  'publishing',
  'complete',
  'hiatus',
  'discontinued',
  'upcoming',
] as const;

export interface GenreItem {
  mal_id: number;
  name: string;
  type?: string;
  url?: string;
}

export type MangaStatusType = (typeof ALL_MANGA_STATUS)[number];
export type MangaOrderByAttributeType =
  (typeof ALL_ORDER_BY_SORT_BY_ATTRIBUTES)[number];
export interface SearchFormData {
  searchTerm: string | null;
  status: MangaStatusType | null;
  orderBy: MangaOrderByAttributeType | null;
  genre: GenreItem[] | null;
  sortBy: MangaSortMethod | null;
}

export interface ExtendedSearchFormData extends SearchFormData {
  page: number;
  limit: number;
}

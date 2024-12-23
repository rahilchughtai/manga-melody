import { GenreItem } from './filter.model';

export interface MangaImage {
  jpg: MangaImageCollection;
  webp?: MangaImageCollection;
}

export interface MangaImageCollection {
  image_url: string;
  small_image_url?: string;
  medium_image_url?: string;
  large_image_url?: string;
  maximum_image_url?: string;
}

export interface JikanResource {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanNamedResource {
  name: string;
  url: string;
}

export interface JikanResourceTitle {
  type: string;
  title: string;
}

export interface JikanResourcePeriod {
  from: string;
  to: string;
  prop: {
    from: { day: number; month: number; year: number };
    to: { day: number; month: number; year: number };
    string: string;
  };
}

export interface JikanResourceRelation {
  relation: string;
  entry: JikanResource[];
}

export interface MangaFavorite {
  mal_id: number;
  title: string;
  title_english: string;
  title_japanese: string;
  published: Published;
  volumes?: number;
  images: ImageType;
}
export interface MangaItem extends MangaFavorite {
  url?: string;
  synopsis?: string;
  type?: string;
  published: Published;
  status?: string;
  members?: number;
  authors?: any[];
  score?: number;
  serialization?: any[];
  popularity?: number;
  favorites?: number;
  genres?: GenreItem[];
}

export interface Published {
  from: Date;
  to?: Date;
  string: string;
}

export interface ImageType {
  jpg: ImageJPG;
}

export interface ImageJPG {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export type MangaType =
  | 'Manga'
  | 'Novel'
  | 'Lightnovel'
  | 'Oneshot'
  | 'Doujin'
  | 'Manhwa'
  | 'Manhua';
export type MangaStatus =
  | 'Publishing'
  | 'Complete'
  | 'On Hiatus'
  | 'Discontinued'
  | 'Upcoming';

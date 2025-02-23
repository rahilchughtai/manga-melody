import { MangaItem } from '../models';

export const mockMangaData: MangaItem = {
  price: 10,
  mal_id: 2,
  url: 'https://myanimelist.net/manga/2/Berserk',
  images: {
    jpg: {
      image_url: 'https://cdn.myanimelist.net/images/manga/1/157897.jpg',
      small_image_url: 'https://cdn.myanimelist.net/images/manga/1/157897t.jpg',
      large_image_url: 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg',
    },
  },
  title: 'Berserk',
  title_english: 'Berserk',
  title_japanese: 'ベルセルク',
  type: 'Manga',
  status: 'Publishing',
  published: {
    from: new Date(),
    to: new Date(),
    string: 'Aug 25, 1989 to ?',
  },
  score: 9.47,
  popularity: 1,
  members: 737822,
  favorites: 132129,
  synopsis:
    'Guts, a former mercenary now known as the Black Swordsman, is out for revenge. After a tumultuous childhood, he finally finds someone he respects and believes he can trust, only to have everything fall apart when this person takes away everything important to Guts for the purpose of fulfilling his own desires. Now marked for death, Guts becomes condemned to a fate in which he is relentlessly pursued by demonic beings.\n\nSetting out on a dreadful quest riddled with misfortune, Guts, armed with a massive sword and monstrous strength, will let nothing stop him, not even death itself, until he is finally able to take the head of the one who stripped him—and his loved one—of their humanity.\n\n[Written by MAL Rewrite]\n\nIncluded one-shot:\nVolume 14: Berserk: The Prototype',
  authors: [
    {
      mal_id: 1868,
      type: 'people',
      name: 'Miura, Kentarou',
      url: 'https://myanimelist.net/people/1868/Kentarou_Miura',
    },
    {
      mal_id: 49592,
      type: 'people',
      name: 'Studio Gaga',
      url: 'https://myanimelist.net/people/49592/Studio_Gaga',
    },
  ],
  genres: [
    {
      mal_id: 1,
      type: 'manga',
      name: 'Action',
      url: 'https://myanimelist.net/manga/genre/1/Action',
    },
    {
      mal_id: 2,
      type: 'manga',
      name: 'Adventure',
      url: 'https://myanimelist.net/manga/genre/2/Adventure',
    },
    {
      mal_id: 46,
      type: 'manga',
      name: 'Award Winning',
      url: 'https://myanimelist.net/manga/genre/46/Award_Winning',
    },
    {
      mal_id: 8,
      type: 'manga',
      name: 'Drama',
      url: 'https://myanimelist.net/manga/genre/8/Drama',
    },
    {
      mal_id: 10,
      type: 'manga',
      name: 'Fantasy',
      url: 'https://myanimelist.net/manga/genre/10/Fantasy',
    },
    {
      mal_id: 14,
      type: 'manga',
      name: 'Horror',
      url: 'https://myanimelist.net/manga/genre/14/Horror',
    },
  ],
};

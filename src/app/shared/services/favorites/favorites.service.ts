import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  untracked,
} from '@angular/core';
import { MangaFavorite, MangaItem } from '../../models';
import { AuthService } from '../auth/auth.service';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private authService = inject(AuthService);
  private isLoggedInSig = this.authService.isLoggedIn();
  private firestore = inject(Firestore);
  private STORAGE_ID = 'favorites';
  private sigMangaFavorites = signal(this.getInitialStorageFavorites());
  public sigMangaFavoriteIds = computed(
    () => new Set(this.sigMangaFavorites().map(({ mal_id }) => mal_id))
  );
  public mangaFavorites = this.sigMangaFavorites.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(
        this.STORAGE_ID,
        JSON.stringify(this.mangaFavorites())
      );
      if (untracked(this.isLoggedInSig)) {
        setDoc(
          doc(
            this.firestore,
            'users',
            untracked(this.authService.userData)?.uid ?? ''
          ),
          { favorites: this.mangaFavorites() },
          { merge: true }
        );
      }
    });
  }

  private getInitialStorageFavorites(): MangaFavorite[] {
    const favorites = localStorage.getItem(this.STORAGE_ID);
    return favorites !== null ? JSON.parse(favorites) : [];
  }

  public addMangaFavorite(mangaItem: MangaItem) {
    const { mal_id, title, title_english, title_japanese, published, images } =
      mangaItem;
    if (this.sigMangaFavoriteIds().has(mal_id)) {
      // TODO Toast message
      return;
    }

    const mangaFavorite: MangaFavorite = {
      mal_id,
      title,
      title_english,
      title_japanese,
      published,
      images,
    };
    this.sigMangaFavorites.set([...this.mangaFavorites(), mangaFavorite]);
  }

  public isFavorite(mangaItem: MangaItem): Signal<boolean> {
    return computed(() => this.sigMangaFavoriteIds().has(mangaItem.mal_id));
  }

  public removeMangaFromFavorites(mangaItem: MangaFavorite) {
    this.sigMangaFavorites.set(
      this.mangaFavorites().filter(({ mal_id }) => mal_id !== mangaItem.mal_id)
    );
  }

  public clearFavorites() {
    this.sigMangaFavorites.set([]);
  }
}

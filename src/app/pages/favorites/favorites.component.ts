import { MangaListComponent } from '../../components/manga-list/manga-list.component';
import { MangaItem } from '../../shared/models';
import { FavoritesService } from '../../shared/services';
import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, MangaListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  /** Inject the FavoritesService to fetch manga favorites */
  private favoriteService = inject(FavoritesService);

  /** A signal that holds the list of manga favorites */
  public mangaFavoritesSig = this.favoriteService
    .mangaFavorites as unknown as Signal<MangaItem[]>;
}

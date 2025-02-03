import { MangaListComponent } from '../../components/manga-list/manga-list.component';
import { MangaFavorite } from '../../shared/models';
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
  private favoriteService = inject(FavoritesService);

  public mangaFavoritesSig = this.favoriteService
    .mangaFavorites as unknown as Signal<MangaFavorite[]>;
}

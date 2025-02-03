import { MangaItem } from '../../shared/models';
import { FavoritesService } from '../../shared/services';
import { SnackbarService } from '../../shared/services';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manga-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './manga-card.component.html',
  styleUrl: './manga-card.component.scss',
})
export class MangaCardComponent {
  private router = inject(Router);
  private favoritesService = inject(FavoritesService);
  private snackService = inject(SnackbarService);

  public fullWidthTitle = input<boolean>(false);

  public mangaData = input.required<MangaItem>();

  public isFavoriteSig = computed(() =>
    this.favoritesService.isFavorite(this.mangaData())()
  );

  public placeHolderImageSig = computed(
    () => `https://placehold.co/225x320?text=${this.mangaData().title_english}`
  );

  public btnMangaFavoriteClick(event: Event) {
    event.stopPropagation();
    if (!this.isFavoriteSig()) {
      this.snackService.openSnackBar('Manga added to favorites!');
      return this.favoritesService.addMangaFavorite(this.mangaData());
    }
    this.snackService.openSnackBar(
      'Manga removed from favorites!',
      'snackbar-danger'
    );

    return this.favoritesService.removeMangaFromFavorites(this.mangaData());
  }

  public onMangaClicked() {
    this.router.navigate([`/manga/${this.mangaData().mal_id}`], {
      state: { mangaData: this.mangaData() },
    });
  }
}

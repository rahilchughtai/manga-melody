import { Component, input } from '@angular/core';
import { MangaFavorite, MangaItem } from '../../shared/models';
import { MangaCardComponent } from '../manga-card/manga-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-manga-list',
  imports: [MangaCardComponent, MatProgressSpinnerModule],
  templateUrl: './manga-list.component.html',
  styleUrl: './manga-list.component.scss',
})
export class MangaListComponent {
  public mangaList = input.required<MangaItem[]>();
  public isLoading = input<boolean>(false);
  public emptyListMessage = input<string>('No manga found');
}

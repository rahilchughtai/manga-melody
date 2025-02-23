import { MangaListComponent } from '../../components/manga-list/manga-list.component';
import { MangaApiService } from '../../shared/services';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MangaListComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  /** Inject the MangaApiService to fetch manga data */
  private mangaApiService = inject(MangaApiService);

  /** Limit of manga data to fetch */
  private limit = 5;

  /** A signal that indicates whether the manga data is loading */
  public isLoadingSig = signal(true);

  /**
   * A readonly resource that fetches manga data from the Jikan API.
   *
   * This resource uses the `rxResource` utility to manage the loading state and
   * caching of the manga data. The data is fetched using the `getJikanMangaData`
   * method of the `mangaApiService`, with a limit specified by the `limit` property.
   * The response is then mapped to extract the `data` property.
   *
   */
  public mangaData = rxResource({
    loader: () =>
      this.mangaApiService
        .getJikanMangaData({ limit: this.limit })
        .pipe(map(response => response?.data)),
  }).asReadonly();
}

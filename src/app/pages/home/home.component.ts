import { MangaListComponent } from '../../components/manga-list/manga-list.component';
import { MangaApiService } from '../../shared/services';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, CommonModule, MangaListComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private mangaApiService = inject(MangaApiService);
  private limit = 5;

  public isLoadingSig = signal(true);
  public mangaData = rxResource({
    loader: () =>
      this.mangaApiService
        .getJikanMangaData({ limit: this.limit })
        .pipe(map(response => response?.data)),
  }).asReadonly();
}

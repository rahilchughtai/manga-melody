import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MangaApiService } from '../../shared/services';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { MangaListComponent } from '../../components/manga-list/manga-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MangaListComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private mangaApiService = inject(MangaApiService);
  private limit = 5;
  public isLoadingSig = signal(true);

  public mangaDataSig = toSignal(
    this.mangaApiService.getJikanMangaData({ limit: this.limit }).pipe(
      map((response) => response?.data),
      tap(() => this.isLoadingSig.set(false))
    )
  );
}

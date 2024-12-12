import { Component, inject, input, signal, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MangaCardComponent } from '../../components/manga-card/manga-card.component';
import { MangaApiService } from '../../shared/services';
import { MangaData } from '../../shared/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { MangaListComponent } from '../../components/manga-list/manga-list.component';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MangaCardComponent, MangaListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private mangaApiService = inject(MangaApiService);
  private limit = 5;
  public isLoadingSig = signal(true);

  public mangaDataSig = toSignal(
    this.mangaApiService.getJikanMangaData({ limit: this.limit }).pipe(
      map((response) => response.data),
      tap(() => this.isLoadingSig.set(false))
    )
  );
}

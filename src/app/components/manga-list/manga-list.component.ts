import { Component, input } from '@angular/core';
import { MangaData } from '../../shared/models';
import { MangaCardComponent } from "../manga-card/manga-card.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-manga-list',
  imports: [MangaCardComponent, MatProgressSpinnerModule],
  templateUrl: './manga-list.component.html',
  styleUrl: './manga-list.component.scss'
})
export class MangaListComponent {

  public mangaDataList = input.required<MangaData[]>();
  public isLoading = input<boolean>(true);

}

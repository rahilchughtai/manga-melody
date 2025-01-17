import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaCardComponent } from '../../components/manga-card/manga-card.component';
import { MangaItem } from '../../shared/models';

interface MangaNavigationData {
  mangaData: MangaItem;
}

@Component({
  selector: 'app-manga-details',
  imports: [CommonModule, MangaCardComponent],
  templateUrl: './manga-details.component.html',
  styleUrl: './manga-details.component.scss',
})
export class MangaDetailsComponent {
  private router = inject(Router);
  public navigationState = this.router.getCurrentNavigation()?.extras.state as MangaNavigationData;
}

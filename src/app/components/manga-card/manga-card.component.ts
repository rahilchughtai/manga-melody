import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MangaData } from '../../shared/models';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
MatIconModule;
@Component({
  selector: 'app-manga-card',
  imports: [MatCardModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './manga-card.component.html',
  styleUrl: './manga-card.component.scss',
})
export class MangaCardComponent {
  mangaData = input.required<MangaData>();
}

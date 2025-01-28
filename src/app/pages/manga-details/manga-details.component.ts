import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MangaCardComponent } from '../../components/manga-card/manga-card.component';
import { MangaItem } from '../../shared/models';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../shared/services/cart/cart.service';
import {
  createArrayFromInteger,
  minifyMangaData,
} from '../../shared/utils/manga-utils';

interface MangaNavigationData {
  mangaData: MangaItem;
}

@Component({
  selector: 'app-manga-details',
  imports: [
    CommonModule,
    MangaCardComponent,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './manga-details.component.html',
  styleUrl: './manga-details.component.scss',
})
export class MangaDetailsComponent {
  public mangaDetailsForm = new FormGroup({
    quantity: new FormControl(0),
    volume: new FormControl(0),
  });

  private cartService = inject(CartService);
  private router = inject(Router);
  public navState = this.router.getCurrentNavigation()?.extras
    .state as MangaNavigationData;

  public quantityArray = createArrayFromInteger(50);
  public volumesArray = createArrayFromInteger(
    this.navState.mangaData.volumes ?? 10
  );

  public addMangaItemToCart() {
    let { quantity, volume } = this.mangaDetailsForm.value;
    const price = 20;
    quantity ??= 1;
    volume ??= 1;
    this.cartService.upsertMangaItemToCart({
      mangaData: minifyMangaData(this.navState.mangaData),
      quantity,
      volume,
      subtotal: price * quantity,
    });
  }
}

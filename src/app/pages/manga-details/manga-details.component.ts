import { CommonModule, CurrencyPipe } from '@angular/common';
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
import { CartService } from '../../shared/services';
import {
  createArrayFromInteger,
  minifyMangaData,
} from '../../shared/utils/manga-utils';
import { AuthService } from '../../shared/services';
import { SnackbarService } from '../../shared/services';

interface MangaNavigationData {
  mangaData: MangaItem;
}

@Component({
  selector: 'app-manga-details',
  imports: [
    CurrencyPipe,
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

  private snackService = inject(SnackbarService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public navState = this.router.getCurrentNavigation()?.extras
    .state as MangaNavigationData;

  public quantityArray = createArrayFromInteger(50);
  public volumesArray = createArrayFromInteger(
    this.navState.mangaData.volumes ?? 10
  );

  public addMangaItemToCart() {
    this.snackService.openSnackBar('Manga added to cart!');

    if (this.authService.userDataSnapshot === null) {
      this.snackService.openSnackBar(
        'Please login to add items to cart!',
        'snackbar-danger'
      );
      return;
    }
    const price = this.navState.mangaData.price;
    let { quantity, volume } = this.mangaDetailsForm.value;
    quantity ??= 1;
    volume ??= 1;
    this.cartService.upsertMangaItemToCart(
      {
        mangaData: minifyMangaData(this.navState.mangaData),
        quantity,
        volume,
        subtotal: price * quantity,
      },
      false
    );
  }
}

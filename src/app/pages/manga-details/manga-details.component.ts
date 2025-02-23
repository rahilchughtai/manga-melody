import { MangaCardComponent } from '../../components/manga-card/manga-card.component';
import { MangaItem } from '../../shared/models';
import { AuthService } from '../../shared/services';
import { CartService } from '../../shared/services';
import { SnackbarService } from '../../shared/services';
import {
  createArrayFromInteger,
  MAX_MANGA_ORDER_QUANTITY,
  minifyMangaData,
} from '../../shared/utils/manga-utils';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormsModule,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

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
    MatChipsModule,
  ],
  templateUrl: './manga-details.component.html',
  styleUrl: './manga-details.component.scss',
})
export class MangaDetailsComponent {
  /** Form for the manga details */
  public mangaDetailsForm = new FormGroup({
    quantity: new FormControl(0),
    volume: new FormControl(0),
  });

  /** SnackbarService for displaying snackbar messages */
  private snackService = inject(SnackbarService);

  /** CartService for handling cart business logic */
  private cartService = inject(CartService);

  /** AuthService for handling user authentication */
  private authService = inject(AuthService);

  /** Router for navigation */
  private router = inject(Router);

  /** Navigation state data from the router */
  public navState = this.router.getCurrentNavigation()?.extras
    .state as MangaNavigationData;

  /** Array of possible quantities with max value*/
  public quantityArray = createArrayFromInteger(MAX_MANGA_ORDER_QUANTITY);

  /** Array of possible volumes with default value */
  public volumesArray = createArrayFromInteger(
    this.navState.mangaData.volumes ?? 10
  );

  /**
   * Add manga item to the cart.
   * Displays a snackbar message when the manga is added to the cart.
   * If the user is not logged in, a snackbar message is displayed.
   * The manga item is added to the cart using the `upsertMangaItemToCart` method
   * of the `cartService`.
   */
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

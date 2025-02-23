import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { CartItem } from '../../shared/models';
import { CartService } from '../../shared/services';
import { APP_ROUTES } from '../../shared/utils/app-routes';
import { calculateTotalAmount } from '../../shared/utils/manga-utils';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CartListComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  /** Boolean whether the cart data is changeable */
  public changeable = true;

  /** Router service for navigation */
  public router = inject(Router);

  /** CartService for handling cart business logic */
  public cartService = inject(CartService);

  /** Signal that holds the cart items with subtotals */
  public cartItems: Signal<CartItem[] | undefined> = toSignal(
    this.cartService.getShoppingCart().pipe(map(this.calculateSubtotals))
  );

  /** Computed property that calculates the total amount of the cart items */
  public cartTotalAmount = computed(() =>
    calculateTotalAmount(this.cartItems() ?? [])
  );

  /** Helper function that calculates the subtotal of each cart item */
  private calculateSubtotals(cartItems: CartItem[]): CartItem[] {
    return cartItems.map(item => ({
      ...item,
      subtotal: item.mangaData.price * item.quantity,
    }));
  }

  /** Navigate to the checkout page */
  public navigateToCheckout() {
    this.router.navigate([APP_ROUTES.CHECKOUT], {
      state: { cartItems: this.cartItems() },
    });
  }
}

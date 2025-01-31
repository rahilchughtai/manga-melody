import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../shared/models';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CartService } from '../../shared/services/cart/cart.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { APP_ROUTES } from '../../shared/utils/app-routes';

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
  changable = true;
  public router = inject(Router);
  public cartService = inject(CartService);
  public cartItems: Signal<CartItem[] | undefined> = toSignal(
    this.cartService.getShoppingCart().pipe(map(this.calculateSubtotals))
  );

  private calculateSubtotals(cartItems: CartItem[]): CartItem[] {
    return cartItems.map(item => ({
      ...item,
      subtotal: item.mangaData.price * item.quantity,
    }));
  }
  private calculateTotalAmount(cartItems: CartItem[]): number {
    return cartItems.reduce((total, item) => total + item.subtotal, 0);
  }

  public navigateToCheckout() {
    this.router.navigate([APP_ROUTES.CHECKOUT], {
      state: { cartItems: this.cartItems() },
    });
  }
}

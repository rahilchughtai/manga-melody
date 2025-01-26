import { Component, computed, inject, Signal } from '@angular/core';
import { getDoc } from '@angular/fire/firestore';

import { AuthService } from '../../shared/services/auth/auth.service';
import { from } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, JsonPipe, NgFor, NgForOf, NgIf } from '@angular/common';
import { CartItem } from '../../shared/models';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CartService } from '../../shared/services/cart/cart.service';
import { createArrayFromInteger } from '../../shared/utils/manga-utils';

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
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  changable = true;
  public cartService = inject(CartService);
  public cartItems = toSignal(this.cartService.getShoppingCart());

  public increaseQuantity(cartItem: CartItem) {
    this.cartService.updateCartItemQuantity(cartItem, cartItem.quantity + 1);
  }
  public decreaseQuantity(cartItem: CartItem) {
    this.cartService.updateCartItemQuantity(cartItem, cartItem.quantity - 1);
  }

  public removeItem(cartItem: CartItem) {
    this.cartService.deleteItemFromShoppingCart(cartItem);
  }

  public createQuantityOptions = (quantity: number) =>
    createArrayFromInteger(quantity);

  public setQuantity(cartItem: CartItem, newQuantity: number) {
    return null;
  }
}

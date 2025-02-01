import { Component, inject, input } from '@angular/core';
import { CartItem } from '../../shared/models';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe, NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CartService } from '../../shared/services/cart/cart.service';
import {
  createArrayFromInteger,
  MAX_MANGA_ORDER_QUANTITY,
} from '../../shared/utils/manga-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  imports: [
    NgFor,
    CurrencyPipe,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  public changable = input.required<boolean>();
  public cartItems = input.required<CartItem[]>();
  private cartService = inject(CartService);

  private router = inject(Router);
  public increaseQuantity(cartItem: CartItem) {
    this.cartService.modifyCartItemQuantity(cartItem, cartItem.quantity + 1);
  }
  public decreaseQuantity(cartItem: CartItem) {
    this.cartService.modifyCartItemQuantity(cartItem, cartItem.quantity - 1);
  }

  public updateQuantity(cartItem: CartItem, quantity: number) {
    this.cartService.modifyCartItemQuantity(cartItem, quantity);
  }

  public removeItem(cartItem: CartItem) {
    this.cartService.deleteItemFromShoppingCart(cartItem);
  }

  public maxQuantity = MAX_MANGA_ORDER_QUANTITY;
  public mangaQuantityOptions = createArrayFromInteger(this.maxQuantity);
}

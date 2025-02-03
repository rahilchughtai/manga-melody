import { CartItem } from '../../shared/models';
import { CartService } from '../../shared/services';
import {
  createArrayFromInteger,
  MAX_MANGA_ORDER_QUANTITY,
} from '../../shared/utils/manga-utils';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  private cartService = inject(CartService);
  public changable = input.required<boolean>();
  public cartItems = input.required<CartItem[]>();
  private router = inject(Router);

  public maxQuantity = MAX_MANGA_ORDER_QUANTITY;
  public mangaQuantityOptions = createArrayFromInteger(this.maxQuantity);

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
}

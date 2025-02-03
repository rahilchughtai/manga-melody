import { CartItem } from '../../models/cart.model';
import { MAX_MANGA_ORDER_QUANTITY } from '../../utils/manga-utils';
import { AuthService } from '../auth/auth.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { inject, Injectable } from '@angular/core';
import { updateDoc } from '@angular/fire/firestore';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private authService = inject(AuthService);
  private snackService = inject(SnackbarService);

  public getShoppingCart() {
    return this.authService.getUserData().pipe(map(user => user?.cart ?? []));
  }

  private findCartItemIndex(cart: CartItem[], newCartItem: CartItem) {
    return cart.findIndex(
      item =>
        item.mangaData.mal_id === newCartItem.mangaData.mal_id &&
        item.volume === newCartItem.volume
    );
  }

  private filterItemFromCart(cart: CartItem[], itemIndex: number) {
    return cart.filter((_, i) => i !== itemIndex);
  }

  public clearCart() {
    this.updateShoppingCart([]);
  }

  public getCartItemCount() {
    return this.getShoppingCart()?.pipe(map(cart => cart.length ?? 0));
  }

  private deleteItemFromCart(cart: CartItem[], cartItem: CartItem) {
    const existingCartIndex = this.findCartItemIndex(cart, cartItem);
    if (existingCartIndex === -1) {
      return cart;
    }
    return this.filterItemFromCart(cart, existingCartIndex);
  }

  private mergeCart(
    cart: CartItem[],
    newCartItem: CartItem,
    overrideQuantity: boolean
  ): CartItem[] {
    const existingCartIndex = this.findCartItemIndex(cart, newCartItem);

    if (newCartItem.quantity <= 0) {
      return this.deleteItemFromCart(cart, newCartItem);
    }

    if (existingCartIndex === -1) {
      return [...cart, newCartItem];
    }
    const existingItem = cart[existingCartIndex];
    const quantity = overrideQuantity
      ? newCartItem.quantity
      : existingItem.quantity + newCartItem.quantity;

    if (quantity > MAX_MANGA_ORDER_QUANTITY) {
      this.snackService.openSnackBar(
        `Exceeded max manga order quantity of ${MAX_MANGA_ORDER_QUANTITY}`,
        'snackbar-danger'
      );
      return cart;
    }
    const subtotal = newCartItem.mangaData.price * quantity;

    return cart.map((item, index) =>
      index === existingCartIndex ? { ...item, quantity, subtotal } : item
    );
  }

  public deleteItemFromShoppingCart(cartItem: CartItem) {
    return this.getShoppingCart()
      ?.pipe(take(1))
      .subscribe(cart => {
        const newCart = this.deleteItemFromCart(cart, cartItem);
        this.updateShoppingCart(newCart);
      });
  }

  public upsertMangaItemToCart(
    newCartItem: CartItem,
    overrideQuantity: boolean
  ) {
    return this.getShoppingCart()
      ?.pipe(take(1))
      .subscribe(cart => {
        const newCart = this.mergeCart(cart, newCartItem, overrideQuantity);
        this.updateShoppingCart(newCart);
      });
  }

  private updateShoppingCart(newCart: CartItem[]) {
    const docRef = this.authService.userDocumentRef;
    if (!docRef) {
      return;
    }
    updateDoc(docRef, { cart: newCart });
  }

  public modifyCartItemQuantity(cartItem: CartItem, newQuantity: number) {
    const newCartItem = { ...cartItem, quantity: newQuantity };
    return this.upsertMangaItemToCart(newCartItem, true);
  }
}

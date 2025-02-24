import { CartItem } from '../../models/cart.model';
import { MAX_MANGA_ORDER_QUANTITY } from '../../utils/manga-utils';
import { AuthService } from '../auth/auth.service';
import { FirestoreWrapperService } from '../firestore-wrapper/firestore-wrapper.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { inject, Injectable } from '@angular/core';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private authService = inject(AuthService);
  private snackService = inject(SnackbarService);
  private firestoreWrapper = inject(FirestoreWrapperService);

  public getShoppingCart() {
    return this.authService.getUserData().pipe(map(user => user?.cart || []));
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

  /**
   * Helper function to merge a new cart item with the existing cart.
   * If the new quantity is less than or equal to 0, the item will be removed from the cart.
   * If the new quantity exceeds the max manga order quantity, a snackbar will be displayed.
   * @param cart The existing cart.
   * @param newCartItem The new cart item to be merged with the existing cart.
   * @param overrideQuantity If true, the quantity of an existing item will be overridden by the new item's quantity.
   * Otherwise, the quantity will be added to the existing item's quantity.
   * @returns The updated cart.
   * */
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

  /**
   * Deletes an item from the shopping cart.
   *
   * @param cartItem - The item to be deleted from the shopping cart.
   * @returns An observable that completes when the item has been deleted.
   */
  public deleteItemFromShoppingCart(cartItem: CartItem) {
    return this.getShoppingCart()
      ?.pipe(take(1))
      .subscribe(cart => {
        const newCart = this.deleteItemFromCart(cart, cartItem);
        this.updateShoppingCart(newCart);
      });
  }

  /**
   * Updates or inserts a manga item in the shopping cart.
   *
   * @param newCartItem - The new cart item to be added or updated.
   * @param overrideQuantity - If true, the quantity of an existing item will be overridden by the new item's quantity.
   * Otherwise, the quantity will be added to the existing item's quantity.
   *
   * @returns An observable that emits the updated shopping cart.
   */
  public upsertMangaItemToCart(
    newCartItem: CartItem,
    overrideQuantity = false
  ) {
    return this.getShoppingCart()
      ?.pipe(take(1))
      .subscribe(cart => {
        const newCart = this.mergeCart(cart, newCartItem, overrideQuantity);
        this.updateShoppingCart(newCart);
      });
  }

  /**
   * Updates the shopping cart in Firestore.
   *
   * @param newCart The new shopping cart to be updated in Firestore.
   * @returns void
   */
  private updateShoppingCart(newCart: CartItem[]) {
    const docRef = this.authService.userDocumentRef;
    if (!docRef) {
      return;
    }
    this.firestoreWrapper.updateDoc(docRef, { cart: newCart });
  }

  /**
   * Modifies the quantity of a cart item in the shopping cart.
   * If the new quantity is less than or equal to 0, the item will be removed from the cart.
   * If the new quantity exceeds the max manga order quantity, a snackbar will be displayed.
   * @param existingCartItem The existing cart item to be modified.
   * @param newQuantity The new quantity of the cart item.
   * @returns void
   * @see {@link MAX_MANGA_ORDER_QUANTITY}
   * */
  public modifyCartItemQuantity(
    existingCartItem: CartItem,
    newQuantity: number
  ) {
    const newCartItem = { ...existingCartItem, quantity: newQuantity };
    // The new quantity is already correct and will be used to override the existing quantity.
    return this.upsertMangaItemToCart(newCartItem, true);
  }
}

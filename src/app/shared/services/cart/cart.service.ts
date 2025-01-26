import { inject, Injectable } from '@angular/core';
import {
  arrayUnion,
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { CartItem } from '../../models/cart.model';
import { map, pipe, take } from 'rxjs';
import { MangaUser } from '../../models/manga-user.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private authService = inject(AuthService);

  public getShoppingCart() {
    return this.authService.getUserData().pipe(map((user) => user?.cart ?? []));
  }

  private findCartItemIndex(cart: CartItem[], newCartItem: CartItem) {
    return cart.findIndex(
      (item) =>
        item.mangaData.mal_id === newCartItem.mangaData.mal_id &&
        item.volume === newCartItem.volume
    );
  }

  private filterItemFromCart(cart: CartItem[], itemIndex: number) {
    return cart.filter((_, i) => i !== itemIndex);
  }

  private deleteItemFromCart(cart: CartItem[], cartItem: CartItem) {
    const existingCartIndex = this.findCartItemIndex(cart, cartItem);
    if (existingCartIndex === -1) {
      return cart;
    }
    return this.filterItemFromCart(cart, existingCartIndex);
  }

  private mergeCart(cart: CartItem[], newCartItem: CartItem): CartItem[] {
    const newQuantity = newCartItem.quantity;
    const existingCartIndex = this.findCartItemIndex(cart, newCartItem);
    if (existingCartIndex === -1) {
      return [...cart, newCartItem];
    }
    if (newQuantity <= 0) {
      return this.deleteItemFromCart(cart, newCartItem);
    }
    cart[existingCartIndex].quantity = newCartItem.quantity;
    return cart;
  }

  public deleteItemFromShoppingCart(cartItem: CartItem) {
    return this.getShoppingCart()
      .pipe(take(1))
      .subscribe((cart) => {
        const newCart = this.deleteItemFromCart(cart, cartItem);
        this.updateShoppingCart(newCart);
      });
  }

  public upsertMangaItemToCart(newCartItem: CartItem) {
    return this.getShoppingCart()
      .pipe(take(1))
      .subscribe((cart) => {
        const newCart = this.mergeCart(cart, newCartItem);
        this.updateShoppingCart(newCart);
      });
  }

  public updateShoppingCart(newCart: CartItem[]) {
    updateDoc(this.authService.userDocumentRef, { cart: newCart });
  }

  public updateCartItemQuantity(cartItem: CartItem, newQuantity: number) {
    const newCartItem = { ...cartItem, quantity: newQuantity };
    return this.upsertMangaItemToCart(newCartItem);
  }
}

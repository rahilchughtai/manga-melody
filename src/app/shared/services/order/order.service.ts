import { CheckOutData, MangaOrder } from '../../models';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  Timestamp,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  get ordersCollectionRef() {
    const userPath = this.authService.userDocumentRef?.path;
    if (!userPath) {
      return null;
    }
    return collection(this.firestore, userPath, 'orders');
  }

  public makeOrder(checkoutData: CheckOutData) {
    if (!this.ordersCollectionRef) {
      return null;
    }
    const user = this.authService.userDataSnapshot;
    if (!user) {
      console.error('No user data found');
      return null;
    }
    const orderData: MangaOrder = {
      ...checkoutData,
      orderDate: Timestamp.now(),
      user,
    };
    this.cartService.clearCart();
    return addDoc(this.ordersCollectionRef, orderData);
  }

  public getUserOrders() {
    if (!this.ordersCollectionRef) {
      return of(undefined);
    }
    return collectionData(this.ordersCollectionRef) as Observable<
      MangaOrder[] | undefined
    >;
  }
}

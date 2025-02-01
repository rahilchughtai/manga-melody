import { inject, Injectable } from '@angular/core';
import { CheckOutData, MangaOrder } from '../../models';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  Timestamp,
} from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  get ordersCollectionRef() {
    return collection(
      this.firestore,
      this.authService.userDocumentRef.path,
      'orders'
    );
  }

  public makeOrder(checkoutData: CheckOutData) {
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
    return collectionData(this.ordersCollectionRef) as Observable<
      MangaOrder[] | undefined
    >;
  }
}

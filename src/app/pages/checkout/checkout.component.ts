import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../shared/models';
import { CartListComponent } from '../../components/cart-list/cart-list.component';

interface CheckoutNavigationState {
  cartItems: CartItem[];
}

@Component({
  selector: 'app-checkout',
  imports: [CartListComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private router = inject(Router);
  public cartDataState = this.router.getCurrentNavigation()?.extras
    .state as CheckoutNavigationState;
}

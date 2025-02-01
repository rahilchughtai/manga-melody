import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem, CheckOutData } from '../../shared/models';
import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../shared/services/order/order.service';
import { APP_ROUTES } from '../../shared/utils/app-routes';
import { calculateTotalAmount } from '../../shared/utils/manga-utils';

interface CheckoutNavigationState {
  cartItems: CartItem[];
}

@Component({
  selector: 'app-checkout',
  imports: [
    CurrencyPipe,
    JsonPipe,
    MatButtonModule,
    NgIf,
    CartListComponent,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  private orderService = inject(OrderService);
  private router = inject(Router);
  public cartDataState = this.router.getCurrentNavigation()?.extras
    .state as CheckoutNavigationState;

  public totalAmount = calculateTotalAmount(this.cartDataState.cartItems);

  public ibanForm = new FormGroup({
    iban: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  public shippingForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    address: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    city: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    postalCode: new FormControl<number | null>(null, {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  public makeOrder() {
    const orderData: CheckOutData = {
      orderItems: this.cartDataState.cartItems,
      totalAmount: 200,
      orderIBAN: this.ibanForm.value.iban,
      orderShippingAddress: this.shippingForm.value,
    };
    this.orderService.makeOrder(orderData);
    this.router.navigate([APP_ROUTES.ORDERS]);
  }
}

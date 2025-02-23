import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { NextTabButtonComponent } from '../../components/payment/next-tab-button/next-tab-button.component';
import { CartItem, CheckOutData } from '../../shared/models';
import { OrderService } from '../../shared/services';
import { SnackbarService } from '../../shared/services';
import { APP_ROUTES } from '../../shared/utils/app-routes';
import { calculateTotalAmount } from '../../shared/utils/manga-utils';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { ValidatorService } from 'angular-iban';

interface CheckoutNavigationState {
  cartItems: CartItem[];
}

@Component({
  selector: 'app-checkout',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    NgIf,
    CartListComponent,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    NextTabButtonComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  /** OrderService for handling order business logic */
  private orderService = inject(OrderService);

  /** Router for navigation */
  private router = inject(Router);

  /** Cart data state from the navigation extras */
  public cartDataState = this.router.getCurrentNavigation()?.extras
    .state as CheckoutNavigationState;

  /** Total amount of the cart items */
  public totalAmount = calculateTotalAmount(this.cartDataState.cartItems);

  /** SnackbarService for displaying snackbar messages */
  private snackService = inject(SnackbarService);

  /** Form group for IBAN input */
  public ibanForm = new FormGroup({
    iban: new FormControl('', {
      validators: [Validators.required, ValidatorService.validateIban],
      nonNullable: true,
    }),
  });

  /** Form group for shipping address input */
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

  /** Index of the current step in the checkout process */
  public stepIndex = 0;

  /** Increments the step index */
  public incrementStepIndex() {
    this.stepIndex += 1;
  }

  /** Function for making an order */
  public makeOrder() {
    const orderData: CheckOutData = {
      orderItems: this.cartDataState.cartItems,
      totalAmount: calculateTotalAmount(this.cartDataState.cartItems),
      orderIBAN: this.ibanForm.value.iban?.trim(),
      orderShippingAddress: this.shippingForm.value,
    };
    this.orderService.makeOrder(orderData);
    this.snackService.openSnackBar('Order placed successfully!');
    this.router.navigate([APP_ROUTES.ORDERS]);
  }
}

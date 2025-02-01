import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../shared/models';
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
import { JsonPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface CheckoutNavigationState {
  cartItems: CartItem[];
}

@Component({
  selector: 'app-checkout',
  imports: [
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
  private router = inject(Router);
  public cartDataState = this.router.getCurrentNavigation()?.extras
    .state as CheckoutNavigationState;

  public ibanForm = new FormGroup({
    iban: new FormControl('', [Validators.required]),
  });

  public shippingForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
  });

  public confirmOrder() {
    // make order
  }
}

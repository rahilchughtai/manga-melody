import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { OrderService } from '../../shared/services';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, NgIf, DatePipe, CartListComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  /** OrderService for handling order business logic */
  private orderService = inject(OrderService);

  /** Signal that holds the user's orders */
  public ordersSig = toSignal(this.orderService.getUserOrders());
}

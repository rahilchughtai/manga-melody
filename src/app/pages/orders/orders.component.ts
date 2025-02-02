import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderService } from '../../shared/services/order/order.service';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';
import { CartListComponent } from '../../components/cart-list/cart-list.component';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, NgIf, DatePipe, CartListComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  private orderService = inject(OrderService);
  public ordersSig = toSignal(this.orderService.getUserOrders());
}

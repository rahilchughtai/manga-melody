import {
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/services/auth/auth.service';
import { NavigationLink } from './shared/models';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from './shared/services/cart/cart.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    MatBadgeModule,
    RouterOutlet,
    MatButtonModule,
    MatSidenavModule,
    CommonModule,
    MatNavList,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoggedInSig = inject(AuthService).isLoggedInSig();
  title = 'manga-melody';

  private readonly screenWidth = signal(window.innerWidth);
  private mobileWidthBreakpoint = 768;

  private cartItemCount = toSignal(
    inject(CartService).getCartItemCount() ?? of(undefined)
  );

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.screenWidth.set(window.innerWidth);
  }
  readonly isScreenWide = computed(
    () => this.screenWidth() >= this.mobileWidthBreakpoint
  );

  constructor() {
    window.addEventListener('resize', this.updateScreenWidth);
  }

  private navLinks: NavigationLink[] = [
    { path: '', text: 'Home', icon: 'home' },
    { path: 'search', text: 'Search', icon: 'search' },
    { path: 'favorites', text: 'Favorites', icon: 'favorite' },
    {
      path: 'cart',
      text: 'Cart',
      icon: 'shopping_cart',
      badge: this.cartItemCount,
    },
    { path: 'orders', text: 'Orders', icon: 'receipt' },
    { path: 'profile', text: 'Profile', icon: 'person' },
    { path: 'login', text: 'Login', icon: 'login' },
  ];

  public navigationLinks = computed(() =>
    this.navLinks.filter(link => {
      const isInvalidOrdersLink =
        link.path === 'orders' && !this.isLoggedInSig();
      const isInvalidCartLink = link.path === 'cart' && !this.isLoggedInSig();
      const isInvalidLoginLink = link.path === 'login' && this.isLoggedInSig();
      const isInvalidProfileLink =
        link.path === 'profile' && !this.isLoggedInSig();
      return (
        !isInvalidCartLink &&
        !isInvalidOrdersLink &&
        !isInvalidOrdersLink &&
        !isInvalidLoginLink &&
        !isInvalidProfileLink
      );
    })
  );

  private updateScreenWidth = () => {
    this.screenWidth.set(window.innerWidth);
  };
}

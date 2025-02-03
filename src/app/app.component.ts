import { NavigationLink } from './shared/models';
import { CartService } from './shared/services';
import { FavoritesService } from './shared/services';
import { AuthService } from './shared/services';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
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

  private favoritesService = inject(FavoritesService);

  private cartItemCount = toSignal(
    inject(CartService).getCartItemCount() ?? of(undefined)
  );

  private favoritesCount = computed(
    () => this.favoritesService.mangaFavorites().length
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

  public navLinks: NavigationLink[] = [
    { path: '', text: 'Home', icon: 'home' },
    { path: 'search', text: 'Search', icon: 'search' },
    {
      path: 'favorites',
      text: 'Favorites',
      icon: 'favorite',
      badge: this.favoritesCount,
    },
    {
      path: 'cart',
      text: 'Cart',
      icon: 'shopping_cart',
      badge: this.cartItemCount,
      loggedInOnly: true,
    },
    { path: 'orders', text: 'Orders', icon: 'receipt', loggedInOnly: true },
    { path: 'profile', text: 'Profile', icon: 'person', loggedInOnly: true },
    { path: 'login', text: 'Login', icon: 'login', newUserOnly: true },
  ];

  public navigationLinks = computed(() =>
    this.navLinks.filter(link => {
      const isValidForUser = link.loggedInOnly ? this.isLoggedInSig() : true;
      const isValidForNewUser = link.newUserOnly ? !this.isLoggedInSig() : true;
      return isValidForNewUser && isValidForUser;
    })
  );

  private updateScreenWidth = () => {
    this.screenWidth.set(window.innerWidth);
  };
}

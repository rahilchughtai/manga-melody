import {
  Component,
  computed,
  effect,
  HostListener,
  signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
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
  title = 'manga-melody';

  private readonly screenWidth = signal(window.innerWidth);
  private mobileWidthBreakpoint = 768;

  @HostListener('window:resize', ['$event'])
  onResize(_event: Event): void {
    this.screenWidth.set(window.innerWidth);
  }
  readonly isScreenWide = computed(
    () => this.screenWidth() >= this.mobileWidthBreakpoint
  );

  constructor() {
    window.addEventListener('resize', this.updateScreenWidth);
  }

  public readonly navLinks = [
    { path: '', text: 'Home' },
    { path: '/search', text: 'Search' },
    { path: '/favorites', text: 'Favorites' },
    { path: '/cart', text: 'Cart' },
    { path: '/orders', text: 'Orders' },
    { path: '/profile', text: 'Profile' },
  ];

  private updateScreenWidth = () => {
    this.screenWidth.set(window.innerWidth);
  };
}

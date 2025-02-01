import { Signal } from '@angular/core';
import { AppRoute } from '../utils/app-routes';

export interface NavigationLink {
  path: AppRoute;
  text: string;
  icon: string;
  badge?: Signal<number | undefined>;
}

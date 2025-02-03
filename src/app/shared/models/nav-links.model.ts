import { AppRoute } from '../utils/app-routes';
import { Signal } from '@angular/core';

export interface NavigationLink {
  path: AppRoute;
  text: string;
  icon: string;
  badge?: Signal<number | undefined>;
  loggedInOnly?: boolean;
  newUserOnly?: boolean;
}

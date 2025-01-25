import { Route, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { MangaDetailsComponent } from './pages/manga-details/manga-details.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { APP_ROUTES } from './shared/utils/app-routes';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);

export const routes: Routes = [
  {
    path: APP_ROUTES.HOME,
    component: HomeComponent,
  },
  {
    path: APP_ROUTES.SEARCH,
    component: SearchComponent,
  },
  {
    path: APP_ROUTES.FAVORITES,
    component: FavoritesComponent,
  },
  {
    path: `${APP_ROUTES.MANGA_DETAILS}/:id`,
    component: MangaDetailsComponent,
  },
  {
    path: APP_ROUTES.LOGIN,
    component: LoginRegisterComponent,
    ...canActivate(redirectLoggedInToProfile),
  },
  {
    path: APP_ROUTES.PROFILE,
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

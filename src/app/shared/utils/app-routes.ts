export enum APP_ROUTES {
  HOME = '',
  SEARCH = 'search',
  FAVORITES = 'favorites',
  MANGA_DETAILS = 'manga',
  LOGIN = 'login',
  PROFILE = 'profile',
  CART = 'cart',
  ORDERS = 'orders',
  CHECKOUT = 'checkout',
}

export type AppRoute = `${APP_ROUTES}`;

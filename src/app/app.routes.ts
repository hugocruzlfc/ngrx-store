import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';

import { profileFeature } from './features/profile/store/profile-feature';
import { cartFeature } from './features/cart/store/cart-feature';
import * as cartEffects from './features/cart/store/cart-effect';
import { authGuard } from './core/guards/auth-guard';
import { productsFeature } from './features/products/store/products-feature';
import * as productsEffect from './features/products/store/products-effect';
import * as profileEffect from './features/profile/store/profile-effects';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register-page').then((m) => m.RegisterPage),
  },

  {
    path: '',
    loadComponent: () => import('./features/main-layout').then((m) => m.MainLayout),
    canActivate: [authGuard],
    providers: [provideState(cartFeature), provideEffects(cartEffects)],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products-page').then((m) => m.ProductsPage),
        providers: [provideState(productsFeature), provideEffects(productsEffect)],
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile-page').then((m) => m.ProfilePage),
        providers: [provideState(profileFeature), provideEffects(profileEffect)],
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart-page').then((m) => m.CartPage),
      },
    ],
  },
];

import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { productFeature } from './features/products/store/product-feature';
import { provideEffects } from '@ngrx/effects';
import * as productEffect from './features/products/store/product-effect';
import * as profileEffect from './features/profile/store/profile-effect';
import { profileFeature } from './features/profile/store/profile-feature';
import { cartFeature } from './features/cart/store/cart-feature';
import * as cartEffects from './features/cart/store/cart-effect';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/register/register').then((m) => m.Register),
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
        loadComponent: () => import('./features/products/products').then((m) => m.Products),
        providers: [provideState(productFeature), provideEffects(productEffect)],
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then((m) => m.Profile),
        providers: [provideState(profileFeature), provideEffects(profileEffect)],
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart').then((m) => m.Cart),
      },
    ],
  },
];

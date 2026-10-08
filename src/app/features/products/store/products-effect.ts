import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { ProductsApi } from '../services/products-api';
import { productsActions } from './products-actions';

export const productsEffect = createEffect(
  (action$ = inject(Actions), productsApi = inject(ProductsApi)) => {
    return action$.pipe(
      ofType(productsActions.load),
      switchMap(() => {
        return productsApi.getProducts().pipe(
          map((products) => productsActions.loadSuccess({ products })),
          catchError((error) => of(productsActions.loadFailure({ error: error.message }))),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

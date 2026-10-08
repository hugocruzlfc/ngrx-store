import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../products-type';

export const productsActions = createActionGroup({
  source: 'Products',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ products: Product[] }>(),
    loadFailure: props<{ error: string }>(),

    search: props<{ searchQuery: string }>(),
  },
});

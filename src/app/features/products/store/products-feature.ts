import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../products-type';
import { productsActions } from './products-actions';

export type ProductState = {
  products: Product[]; // 20 records
  filteredProducts: Product[]; // filtered records based on search
  searchQuery: string | null;
  error: string | null;
  loading: boolean;
};

export const initialProductState: ProductState = {
  products: [],
  filteredProducts: [],
  searchQuery: null,
  error: null,
  loading: false,
};

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialProductState,

    on(productsActions.load, (state) => ({
      ...state,
      loading: true,
    })),

    on(productsActions.loadSuccess, (state, { products }) => ({
      ...state,
      products,
      filteredProducts: products,
      loading: false,
      error: null,
    })),

    on(productsActions.loadFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),

    on(productsActions.search, (state, { searchQuery }) => {
      const filteredProducts = state.products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      return {
        ...state,
        searchQuery,
        filteredProducts,
      };
    }),
  ),
});

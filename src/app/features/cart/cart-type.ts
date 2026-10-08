import { Product } from '../products/products-type';

export type CartItem = {
  product: Product;
  quantity: number;
};

import { createAction, props } from '@ngrx/store';
import { Product } from '../Interfaces/product';

// Action types
export const loadProducts = createAction('[Product] Load Products');
export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: Product }>()
);
export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);
export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ productId: number }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

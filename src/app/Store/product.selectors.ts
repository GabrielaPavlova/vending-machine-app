import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productAdapter } from './product.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  productAdapter.getSelectors().selectAll
);

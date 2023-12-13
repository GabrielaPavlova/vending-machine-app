import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '../Interfaces/product';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const productAdapter = createEntityAdapter<Product>();
export interface ProductState extends EntityState<Product> {}

export const initialState: ProductState = productAdapter.getInitialState();

// Reducer
export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) =>
    productAdapter.setAll(products, state)
  ),
  on(ProductActions.loadProducts, (state) => state),
  on(ProductActions.addProduct, (state, { product }) => {
    return productAdapter.addOne(product, state);
  }),
  on(ProductActions.updateProduct, (state, { product }) => {
    return productAdapter.updateOne(
      { id: product.id, changes: product },
      state
    );
  }),
  on(ProductActions.deleteProduct, (state, { productId }) => {
    return productAdapter.removeOne(productId, state);
  })
);

// product.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as productActions from './product.actions';
import { ProductListMockApiService } from '../services/product-list-api/product-list-mock-api.service'; // Implement a service to load products

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => productActions.loadProductsSuccess({ products })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductListMockApiService
  ) {}
}

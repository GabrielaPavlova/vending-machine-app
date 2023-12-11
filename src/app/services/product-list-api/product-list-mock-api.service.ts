import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import * as productsListDataJSON from '../../../assets/mock-data/product-list.json';
import { Product } from 'src/app/Interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductListMockApiService {
  private productsList = '../../../assets/mock-data/product-list.json';
  
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsList);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../Interfaces/product';
import { ProductListMockApiService } from '../services/product-list-api/product-list-mock-api.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() productSelected = new EventEmitter<number>();

  productList: Product[] = [];

  constructor(private productListMock: ProductListMockApiService) {}

  ngOnInit(): void {
    
  }
}

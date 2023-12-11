import { Component, OnInit } from '@angular/core';
import { ProductListMockApiService } from '../services/product-list-api/product-list-mock-api.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
   productList: Product[] = [];


  constructor(private productListMock : ProductListMockApiService) { }

  ngOnInit(): void {
    this.loadProductsList()
  }

  loadProductsList() {
    this.productListMock.getProducts().subscribe(productListMock => {
      this.productList = productListMock;
      console.log(this.productList); // get here the products list
    })

  }

}

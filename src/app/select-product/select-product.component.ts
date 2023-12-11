import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../Interfaces/product';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.css'],
})
export class SelectProductComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() productSelected = new EventEmitter<Product[]>();

  constructor() {}

  ngOnInit(): void {
    //console.log(this.products);
  }

  selectProduct(product: Product[]): void {
    console.log(product);
    this.productSelected.emit(product);
  }
}

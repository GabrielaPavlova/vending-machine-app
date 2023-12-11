import { Component, OnInit } from '@angular/core';
import { ProductListMockApiService } from '../services/product-list-api/product-list-mock-api.service';
import { Product } from '../Interfaces/product';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css'],
})
export class VendingMachineComponent implements OnInit {
  insertedCoins: number[] = [];
  selectedProduct: Product[] | null = null;
  changeToReturn: string = '0';
  products: Product[] = [];

  constructor(private productListMock: ProductListMockApiService) {}

  ngOnInit(): void {
    //console.log(this.products);
    this.getProductList();
  }

  getProductList() {
    this.productListMock.getProducts().subscribe((productListMock) => {
      this.products = productListMock;
      //console.log(this.products); // get here the products list
    });
  }

  insertCoin(coin: number): void {
    this.insertedCoins.push(coin);
  }

  selectProduct(product: Product[]): void {
    this.selectedProduct = product;
  }

  buyProduct(): void {
    // Implement logic to handle the purchase
    // Deduct product quantity, update inventory, etc.
    // Implement change calculation

    if (this.selectedProduct && this.insertedCoins.length) {
      const product = this.products.find(
        (p) => p.id === this.selectedProduct['id']
      );

      if (product && this.calculateTotalInsertedCoins() >= product.price) {
        this.changeToReturn = (
          this.calculateTotalInsertedCoins() - product.price
        ).toFixed(2);
        // this.changeToReturn = Number(change);
        alert(this.changeToReturn);

        this.updateProductQuantity(this.selectedProduct, product);
      } else {
        alert('You do not have enought money to buy this product');
      }
    }

    this.resetProcess();
  }

  calculateTotalInsertedCoins(): number {
    return this.insertedCoins.reduce((total, coin) => total + coin, 0);
  }

  updateProductQuantity(selectedProductUpdate, product) {
    if (product['quantity'] !== 0) {
      const productIndex = this.products.findIndex((p) => p.id === product.id);

      if (productIndex !== -1 && this.products[productIndex].quantity > 0) {
        // Update inventory
        this.products[productIndex].quantity--;
        alert('Update successful');
        return true; // Purchase successful
      }
      return false; // Purchase failed
    } else {
      alert('Out of stock, cannot buy it');
    }
  }

  resetProcess(): void {
    this.insertedCoins = [];
    this.selectedProduct = null;
  }
}

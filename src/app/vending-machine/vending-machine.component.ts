import { Component, OnInit } from '@angular/core';
import * as ProductActions from '../Store/product.actions';

import { Product } from '../Interfaces/product';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllProducts } from '../Store/product.selectors';
import { ProductState } from '../Store/product.reducer';

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
  showAddProductForm = false;
  showEditProductForm = false;
  editedProduct: Product;
  newProduct: Partial<Product> = {};

  products$: Observable<Product[]>;

  constructor(private store: Store<ProductState>) {
    this.products$ = this.store.select(selectAllProducts);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  insertCoin(coin: number): void {
    this.insertedCoins.push(coin);
  }

  selectProduct(product: Product[]): void {
    this.selectedProduct = product;
  }

  buyProduct(): void {
    if (this.selectedProduct && this.insertedCoins.length) {
      this.products$.subscribe((products) => {
        this.products = products;
      });

      const product = this.products.find(
        (p) => p.id === this.selectedProduct['id']
      );

      if (product && this.calculateTotalInsertedCoins() >= product.price) {
        const isTheProductAvailable = this.updateProductQuantity(product);
        if (isTheProductAvailable) {
          this.changeToReturn = (
            this.calculateTotalInsertedCoins() - product.price
          ).toFixed(2);
          alert(this.changeToReturn);
        }
      } else {
        alert('You do not have enought money to buy this product');
        return;
      }
    }
    this.insertedCoins = [];
    this.selectedProduct = null;
  }

  calculateTotalInsertedCoins(): number {
    return this.insertedCoins.reduce((total, coin) => total + coin, 0);
  }

  updateProductQuantity(productToUpdate) {
    const productIndex = this.products.indexOf(productToUpdate);

    if (productIndex !== -1 && this.products[productIndex].quantity !== 0) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        quantity: this.products[productIndex].quantity - 1,
      };
      alert('Update successfu the quantity of the product');
      return true;
    } else {
      alert('Out of stock, cannot buy it');
      return false;
    }
  }

  resetProcessAll(): void {
    this.insertedCoins = [];
    this.selectedProduct = null;
    this.changeToReturn = '0';
  }

  addProduct(): void {
    this.showAddProductForm = true;
  }

  saveProduct(): void {
    if (this.newProduct.name && this.newProduct.price) {
      const newProductId = this.getNextId();
      const newProductCreate: Product = {
        id: newProductId,
        name: this.newProduct.name,
        price: this.newProduct.price,
        outOfStock: false,
        quantity: 15,
        src: '../../../../assets/pics/default.svg', // Set the quantity to 15
      };

      this.store.dispatch(
        ProductActions.addProduct({ product: newProductCreate })
      );

      this.newProduct = {};
      this.showAddProductForm = false;
    }
  }

  cancelEditProduct(): void {
    this.showEditProductForm = false;
  }

  cancelAddProduct(): void {
    this.newProduct = {};
    this.showAddProductForm = false;
  }

  editProduct(product: Product): void {
    this.editedProduct = { ...product };
    this.showEditProductForm = true;
  }

  updateProduct(): void {
    if (this.editedProduct.name && this.editedProduct.price) {
      this.store.dispatch(
        ProductActions.updateProduct({ product: this.editedProduct })
      );
      this.editedProduct = null;
      this.showEditProductForm = false;
    }
  }

  deleteProduct(productId: number): void {
    this.store.dispatch(ProductActions.deleteProduct({ productId }));
  }

  private getNextId(): number {
    let maxId = 0;
    this.products$.subscribe((products) => {
      maxId = Math.max(...products.map((product) => product.id), 0);
    });

    return maxId + 1;
  }
}

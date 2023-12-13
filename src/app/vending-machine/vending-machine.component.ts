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
    console.log('vliza li tuka');
    if (this.selectedProduct && this.insertedCoins.length) {
      console.log('vliza li tuka1');

      this.products$.subscribe((products) => {
        // BAD PRACTISE

        this.products = products;
      });

      const product = this.products.find(
        (p) => p.id === this.selectedProduct['id']
      );

      console.log(this.products);
      if (product && this.calculateTotalInsertedCoins() >= product.price) {
        console.log('vliza li tuka2');
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

  addProduct(): void {
    this.showAddProductForm = true;
  }

  saveProduct(): void {
    // Validate the new product (add additional validation logic as needed)
    if (this.newProduct.name && this.newProduct.price) {
      // Dispatch action to add the new product
      const newProductId = this.getNextId();
      console.log(this.products);

      // Create a new product with the specified ID and quantity and outOfStock
      const newProductCreate: Product = {
        id: newProductId,
        name: this.newProduct.name,
        price: this.newProduct.price,
        outOfStock: false,
        quantity: 15, // Set the quantity to 15
      };

      this.store.dispatch(
        ProductActions.addProduct({ product: newProductCreate })
      );

      // Reset the form
      this.newProduct = {};
      this.showAddProductForm = false;
    }
  }

  cancelAddProduct(): void {
    this.newProduct = {};
    this.showAddProductForm = false;
  }

  editProduct(product: Product): void {
    console.log(product);
    this.editedProduct = { ...product };
    this.showEditProductForm = true;
  }

  updateProduct(): void {
    // Validate the edited product (add additional validation logic as needed)
    if (this.editedProduct.name && this.editedProduct.price) {
      console.log('yes get the edited product');
      console.log(this.editedProduct.name);
      console.log(this.editedProduct.price);
      this.store.dispatch(
        ProductActions.updateProduct({ product: this.editedProduct })
      );

      // Reset the form
      this.editedProduct = null;
      this.showEditProductForm = false;
    }
  }

  deleteProduct(productId: number): void {
    console.log(productId);
    // Dispatch action to delete the product
    this.store.dispatch(ProductActions.deleteProduct({ productId }));
  }

  private getNextId(): number {
    let maxId = 0;

    // Get the existing products
    this.products$.subscribe((products) => {
      // Find the maximum id among the existing products
      maxId = Math.max(...products.map((product) => product.id), 0);
    });

    // Return the next id
    return maxId + 1;
  }
}

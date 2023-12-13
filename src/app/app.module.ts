import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CoinsComponent } from './coins/coins.component';
import { ControlPanelVmComponent } from './control-panel-vm/control-panel-vm.component';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';
import { SelectProductComponent } from './select-product/select-product.component';
import { productReducer } from './Store/product.reducer';
import { ProductEffects } from './Store/product.effects';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CoinsComponent,
    ControlPanelVmComponent,
    VendingMachineComponent,
    SelectProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

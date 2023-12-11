import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CoinsComponent } from './coins/coins.component';
import { BalanceComponent } from './balance/balance.component';
import { ControlPanelVmComponent } from './control-panel-vm/control-panel-vm.component';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';
import { SelectProductComponent } from './select-product/select-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    CoinsComponent,
    BalanceComponent,
    ControlPanelVmComponent,
    VendingMachineComponent,
    SelectProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

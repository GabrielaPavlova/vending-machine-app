import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../Interfaces/product';

@Component({
  selector: 'app-control-panel-vm',
  templateUrl: './control-panel-vm.component.html',
  styleUrls: ['./control-panel-vm.component.css'],
})
export class ControlPanelVmComponent implements OnInit {
  @Input() totalInserted: number = 0;
  @Input() selectedProduct: Product[] | null = null;
  @Input() changeToReturn: string = '0';
  @Output() buyClicked = new EventEmitter<void>();
  @Output() resetClicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  buyProduct(): void {
    this.buyClicked.emit();
  }

  resetProcess(): void {
    this.resetClicked.emit();
  }
}

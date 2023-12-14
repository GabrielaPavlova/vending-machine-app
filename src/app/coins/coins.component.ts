import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ACCEPTED_COIN_DENOMINATIONS } from '../Constants/contants-coins';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css'],
})
export class CoinsComponent implements OnInit {
  @Output() coinInserted = new EventEmitter<number>();

  acceptedCoins = ACCEPTED_COIN_DENOMINATIONS;

  constructor() {}

  ngOnInit(): void {}

  insertCoin(coin: number): void {
    if (this.acceptedCoins.includes(coin)) {
      this.coinInserted.emit(coin);
    } else {
      alert('Invalid coin');
    }
  }
}

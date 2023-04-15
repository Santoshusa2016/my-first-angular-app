import { Injectable } from '@angular/core';
import { Stock } from '../stock/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: Stock[];
  constructor() {
    this.stocks = [
      new Stock('Tesla', 'TSLA', 700, 398, 'NASDAQ'),
      new Stock('Microsoft', 'MFST', 235, 200, 'NSE'),
      new Stock('Amazon', 'AMZ', 250, 190, 'NYSE')
    ];
   }

  getStocks() : Stock[] {
    return this.stocks;
  }

  createStock(stock: Stock) {
    let foundStock = this.stocks.find(each => each.code === stock.code);
    if (foundStock) {
      return false;
    }
    this.stocks.push(stock);
    return true;
  }

  toggleFavorite(stock: Stock) {
    let foundStock = this.stocks.find(each => each.code === stock.code);
    foundStock.favorite = !foundStock.favorite;
  }
}

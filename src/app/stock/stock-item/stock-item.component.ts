import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Stock } from "../stock";

@Component({
    selector: 'app-stock-item',
    templateUrl: './stock-item.component.html'
})

export class StockItemComponent implements OnInit{
    @Input() public stock: Stock;
    @Output() public toggleFavorite: EventEmitter<Stock>;

    public stockClasses;
    public stockStyles;

    constructor(){
      this.toggleFavorite = new EventEmitter<Stock>();
    }
    
    ngOnInit() {  
        //chap03:angular-up-and-running
        let diff = (this.stock.price / this.stock.previousPrice) - 1;
        let largeChange = Math.abs(diff) > 0.01;      
        
        this.stockStyles = {
          "color": this.stock.isPositiveChange() ? "green" : "red",
          "font-size": largeChange ? "1.2em" : "0.8em"
        };

        this.stockClasses = {
            "positive": this.stock.isPositiveChange(),
            "negative": !this.stock.isPositiveChange(),
            "large-change": largeChange,
            "small-change": !largeChange
        };
      }
    
      onToggleFavorite(event) {
        console.log('We are toggling the favorite state for this stock', event);
        this.toggleFavorite.emit(this.stock);
      }
}
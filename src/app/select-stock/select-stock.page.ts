import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-stock',
  templateUrl: './select-stock.page.html',
  styleUrls: ['./select-stock.page.scss'],
})
export class SelectStockPage implements OnInit {

  quotesKeys = Object.keys;
  quotes = {
    days: "Daily", 
    weeks: "Weekly",
    months: "Monthly",
  };
  
  funxtions = {
    Daily: "TIME_SERIES_DAILY",
    Weekly: "TIME_SERIES_WEEKLY",
    Monthly: "TIME_SERIES_MONTHLY"
  };
  symbol: string = "";
  range:number = 50;
  value = this.quotes["days"];
  

  constructor(private router : Router, private route: ActivatedRoute) {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    
  }
  getKey(value){
    return this.quotesKeys(this.quotes).find(k=>this.quotes[k]===this.value);
  }

  showQuotes(){
    let a = {interval: this.funxtions[this.value], symbol: this.symbol, duration: this.range, index: this.quotesKeys(this.funxtions).indexOf(this.value)};
    console.log(a);
    this.router.navigate(['/quote-viewer', a]);
  }

  ngOnInit() {
  }

}

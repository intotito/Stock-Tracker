import { Component, OnInit } from '@angular/core';
import { SymbolGetterService } from '../Service/symbol-getter.service';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { Router} from '@angular/router';


@Component({
  selector: 'app-search-symbol',
  templateUrl: './search-symbol.page.html',
  styleUrls: ['./search-symbol.page.scss'],
})
export class SearchSymbolPage implements OnInit {
  symbol: string;
  data: any[];
  found: boolean = false;
  constructor(private symbolGetter :SymbolGetterService, private clipboard: Clipboard, private router: Router) { }

  ngOnInit() {
   
  }

  searchSymbol(): void{
    let url ='https://financialmodelingprep.com/api/v3/search?query=' + this.symbol + 
      '&limit=10&apikey=a943c5bf3c4543e0807555b230131859';
    console.log(url);
    this.symbolGetter.getSymbol(url).subscribe((data)=>{
      this.data = data;
      console.log(this.data);
      this.found = true;
    });

  }

  copyToClipboard(symbol: string): void{
    this.clipboard.copy(symbol).then(rs => {
      alert(rs);
    }).catch(error => {
      alert(error);
    })
    console.log("Supposedly copied '" + symbol + "'");
  }

  redirect(symbol: string):void{
    let a = {symbol: symbol};
    this.router.navigate(['/select-stock', a]);
    
  }
}

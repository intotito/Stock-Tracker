import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  logoImg: string = "./assets/img/logo.png";
  constructor(private router: Router) {}

  selectStock(): void{
//    let a = {interval: this.funxtions[this.value], symbol: this.symbol, duration: this.range, index: this.quotesKeys(this.funxtions).indexOf(this.value)};
//    console.log(a);
    let a = {};
    this.router.navigate(['/select-stock', a]);
  }

  searchSymbol(): void{
    this.router.navigate(['/search-symbol']);
  }

  showAbout(): void{

  }


}

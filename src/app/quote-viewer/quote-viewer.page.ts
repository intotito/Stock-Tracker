import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Platform } from '@ionic/angular';
import { QuoteGetterService } from '../Service/quote-getter.service';
import { ImageSaverService } from '../Service/image-saver.service';
import { Storage } from '@ionic/storage-angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-quote-viewer',
  templateUrl: './quote-viewer.page.html',
  styleUrls: ['./quote-viewer.page.scss'],
})
export class QuoteViewerPage implements OnInit {
  interval: string;
  symbol: string;
  duration: number;
  index: number;
  data: any;
  dataKeys: string[];
  cardinality: number = 100;
  company: any;
  keys: string[] = [
    "Time Series (Daily)", 
    "Weekly Time Series", 
    "Monthly Time Series"
  ];

  constructor(private route: ActivatedRoute, private quoteGetter: QuoteGetterService, private storage: Storage, 
    private platform: Platform, private menu: MenuController, private imageSaver: ImageSaverService) { 
    this.interval = this.route.snapshot.paramMap.get('interval');
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.duration = Number(this.route.snapshot.paramMap.get('duration'));
    this.index = Number(this.route.snapshot.paramMap.get('index'));
    this.cardinality = this.duration;
 //   this.cardinality = Math.min(5, this.cardinality);

    console.log("Check  this " + this.interval + " -- " + this.symbol + " --" + this.duration);
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
    let url = 'https://www.alphavantage.co/query?function=' + this.interval +
       '&symbol=' + this.symbol + '&apikey=' + '1ONYPOW67MNS430D';
    let url1 = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + this.symbol + 
      '&apikey=1ONYPOW67MNS430D';
    console.log(url);
    this.quoteGetter.getQuotes(url1).subscribe((data)=>{
        this.company = data;
        console.log(this.company);
    });
    this.quoteGetter.getQuotes(url).subscribe((data)=>{
      this.data = data[this.keys[this.index]];
      this.dataKeys = Object.keys(this.data);
 //     console.log("check it");
      this.saveSymbol();
      this.cardinality = Math.min(this.cardinality, this.dataKeys.length);    
        this.paintCanvas();
        this.imageSaver.setCanvas(<HTMLCanvasElement>document.getElementById("canvas"), this.symbol);
    });
    
  }

  getMaximumValue() : number[]{
    let max: number = 0;
   // console.log(this.data);
   // console.log(this.dataKeys);
    let maxValue: number = Number(this.data[this.dataKeys[0]]['4. close']);
    for(let i = 1; i < this.cardinality - 1; i++){
      if(Number(this.data[this.dataKeys[i]]['4. close']) > maxValue){//Number(this.data[this.dataKeys[i - 1]]['4. close'])){
        max = i;
        maxValue = Number(this.data[this.dataKeys[i]]['4. close']); 
      }
    }
    return [max, maxValue];
  }

  getMinimumValue() : number[] {
    let avg: number = 0;
    let min: number = 0;
    let minValue: number = Number(this.data[this.dataKeys[0]]['4. close']);
    avg += minValue;
    for(let i = 1; i < this.cardinality - 1; i++){
      avg += (Number(this.data[this.dataKeys[i]]['4. close']));
      if(Number(this.data[this.dataKeys[i]]['4. close']) < minValue){
        min = i;
        minValue = Number(this.data[this.dataKeys[i]]['4. close']);
      }
    }
    return [min, minValue, avg / this.cardinality];
  }

  paintCanvas(){
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");
    console.log(this.platform.height() + " -- " + this.platform.width());
    canvas.height = (this.platform.height());
    canvas.width = (this.platform.width());
    let height: number = canvas.width;
    let width: number = canvas.width;
    let padding: number = 2 * 20;
    var ctx = canvas.getContext("2d");
    let H: number = height - 2 * padding;
    let W: number = width - 2 * padding;

    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width, canvas.height);

// X and Y axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.lineWidth = 0.5;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = '#0000FF';
    ctx.stroke();
    ctx.closePath();
    
    let maxArr = this.getMaximumValue();
    let max: number = maxArr[1];
    let minArr = this.getMinimumValue();
    let min: number = minArr[1];
    let avg: number = minArr[2];
    let range = min - (max - min) / 8;

    console.log('Maximum = ' + max + '\nMiniumu' + min);

    let tickx: number = W / this.cardinality;
    let ticky: number = H / max;

    ticky = H / (max - range);

// X and Y grids
    let gridX = this.cardinality / 2;
    let gridY = this.cardinality / 2;
    gridX = gridX > 20 ? 20 : gridX;
    gridY = gridY > 20 ? 20 : gridY;

    ctx.beginPath();
    // Vertical grid
    for(let i = 0; i < gridY; i++){
      ctx.moveTo(padding + (W / gridY) * (i + 1), padding + H);
      ctx.lineTo(padding + (W / gridY) * (i + 1), padding); 
    }
    // Horizontal grid
    for(let i = 0; i < gridX; i++){
      ctx.moveTo(padding, padding + H - (H / gridX) * (i + 1));
      ctx.lineTo(padding + W, padding + H - (H / gridX) * (i + 1)); 
    }
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 0.1;
    ctx.stroke();
    ctx.closePath();

// X and Y axis ticks
    let tickSize = 10;
    ctx.beginPath();
    // Vertical Tick
    for(let i = 0; i < gridY / 2; i++){
      ctx.moveTo(padding + (W / (gridY / 2)) * (i + 1), padding + H + tickSize / 2);
      ctx.lineTo(padding + (W / (gridY / 2)) * (i + 1), padding + H - tickSize / 2);
    }
    // Horizontal Tick
    for(let i = 0; i < gridX / 2; i++){
      ctx.moveTo(padding - tickSize / 2, padding + H - (H / (gridX / 2)) * (i + 1));
      ctx.lineTo(padding + tickSize / 2, padding + H - (H / (gridX / 2)) * (i + 1));
    }
    ctx.strokeStyle = '#0000FF'
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.closePath();

  // Y axis labels
  ctx.beginPath();
    ctx.font = "10px sans-serif";
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for(let i = 0; i < gridY / 2; i++){
      let x: number = padding - tickSize / 2;
      let y: number = padding + H - (H / (gridX / 2)) * (i + 1);
      let value: number = range + ((max - range) / H) * (H / (gridX / 2)) * (i + 1);
//      ctx.fillText('' + value.toPrecision(2), 0, padding + H - (H / (gridX / 2)) * (i + 1));
      ctx.fillText('' + value.toFixed(2), x, y);
    }

// X axis labels
    ctx.fillStyle = 'white';
    
    let tempMonth: number = Number(this.dataKeys[this.cardinality - 1].split('-')[1]) - 1;
    let tempYear: number = Number(this.dataKeys[this.cardinality - 1].split('-')[0]);
    for(let i = (gridX / 2); i > 0; i--){
      let x = padding + (W / (gridX / 2) * (gridX / 2 - i));
      let dateParts = this.dataKeys[Math.floor(this.cardinality / (gridX / 2)) * (i) - 1].split('-');
      let date = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
      let value = this.data[this.dataKeys[Math.floor(this.cardinality / (gridX / 2)) * (i) - 1]]['4. close'];
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      console.log("Date: " + date.getDate() + " index: " + this.index + " i: " + i);
      if(this.index < 2){ // Daily and Weekly Series
        ctx.fillText("" + date.getDate(), x, padding + H + tickSize / 2);
        if(i == (gridX / 2) || date.getMonth() != tempMonth){
          ctx.textAlign = 'left';
          ctx.textBaseline = 'bottom';
          ctx.fillText(this.getMonth(date.getMonth()), x, padding + H + padding - tickSize / 2);
        }
      } else {// Monthly Series
        ctx.fillText((date.getMonth() + 1).toString(), x, padding + H + tickSize / 2);
        if(i == (gridX / 2) || date.getFullYear() != tempYear){
          ctx.textAlign = 'left';
          ctx.textBaseline = 'bottom';
          ctx.fillText('' + date.getFullYear(), x, padding + H + padding - tickSize / 2);
        }
      } 
      tempMonth = date.getMonth();
      tempYear = date.getFullYear();
    }
    ctx.closePath();

// Graph
    ctx.beginPath();
    ctx.moveTo(padding + (0) * tickx, padding + (H - ticky * (this.data[this.dataKeys[this.cardinality - 1]]['4. close'] - range)));
//    for(let i = 1; i < this.cardinality; i++){
    for(let i = (this.cardinality - 1); i > 0; i--){
      let datParts = this.dataKeys[i].split('-');
      let date = new Date(Number(datParts[0]), Number(datParts[1]) - 1, Number(datParts[2]));
      let value = this.data[this.dataKeys[i]]['4. close'];
      console.log(value);
      //ctx.lineTo(padding + (i + 1) * tickx, padding + (H - ticky * (value - range)));
      ctx.lineTo(padding + (this.cardinality - i) * tickx, padding + (H - ticky * (value - range)));
    }
    ctx.strokeStyle = '#FFFF00';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    // Heading
    ctx.font = "18px sans-serif"
    ctx.fillStyle = 'green';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    let txtM: TextMetrics = ctx.measureText(this.symbol.toUpperCase() + " Stock");
    ctx.fillText(this.symbol.toUpperCase() + " Stock",
     (width - txtM.width) / 2, tickSize * 2);

     // Statistics
     ctx.font = "10px sans-serif"
     ctx.fillStyle = 'orange';
     ctx.textAlign = 'left';
     ctx.textBaseline = 'middle';
     ctx.fillText("Highest value: " + maxArr[1] + " (" +this.dataKeys[maxArr[0]]+ ")", padding, height + tickSize * 2);
     ctx.fillText("Lowest value: " + minArr[1] + " (" +this.dataKeys[minArr[0]]+ ")", padding, height + tickSize * 4);
     ctx.fillText("Average value: " + minArr[2].toFixed(2), padding, height + tickSize * 6);
     txtM = ctx.measureText("Increase: ");
     ctx.fillText("Increase: ", padding, height + tickSize * 8);
     ctx.fillStyle = (this.data[this.dataKeys[this.cardinality - 1]]['4. close'] > this.data[this.dataKeys[0]]['4. close'] ? 'red': 'green');
     ctx.fillText((this.data[this.dataKeys[this.cardinality - 1]]['4. close'] < this.data[this.dataKeys[0]]['4. close'] ? "\u21E7" : ("\u21E9")) + " " +
     ((this.data[this.dataKeys[0]]['4. close'] - this.data[this.dataKeys[this.cardinality - 1]]['4. close']) / this.data[this.dataKeys[this.cardinality - 1]]['4. close']).toFixed(2)
     + "%",
      padding + txtM.width + 5, height + tickSize * 8);
      // Company Info
      ctx.fillStyle = 'grey';
     ctx.fillText("Company Name: " + this.company['Name'] , padding / 4, height + tickSize * 10);
     ctx.fillText("Stock Exchange: " + this.company['Exchange'], padding / 4, height + tickSize * 12);
     ctx.fillText("Currency: " + this.company['Currency'], padding / 4, height + tickSize * 14);
     ctx.fillText("Sector: " + this.company['Sector'], padding / 4, height + tickSize * 16);
     ctx.fillText("Industry: " + this.company['Industry'], padding / 4, height + tickSize * 18);
     ctx.fillText("Address: " + this.company['Address'], padding / 4, height + tickSize * 20);
  }

  getMonth(month: number): string{
    let months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  }

  saveSymbol(): void{
    this.storage.create().then(()=>{
      this.storage.set("symbol", this.symbol);
    }).catch(()=>{alert('Could not save symbol')});
  }
}

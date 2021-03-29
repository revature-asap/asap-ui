import { Component, OnInit } from '@angular/core';
import { assetQuote } from 'src/app/models/assetQuote.model';
import { assetCandle } from 'src/app/models/assetCandle';
import { FinnhubService } from '../../services/finnhub.service'

// import * as Finnhub from '../../../assets/f'

@Component({
  selector: 'app-asset-display',
  templateUrl: './asset-display.component.html',
  styleUrls: ['./asset-display.component.css']
})
export class AssetDisplayComponent implements OnInit {
 
  //const finnhub = require('finnhub');

  stockprice: number;
  candle!: assetCandle;
  asset!: assetQuote;
 
  // const api_key = finnhub.ApiClient.instance.authentications['api_key']; 
  // api_key.apiKey = "c1cepq748v6scqmqtk8g" // Replace this
  // const finnhubClient = new finnhub.DefaultApi()
  
  constructor(private finnhub: FinnhubService) { 
    console.log(1);

    this.stockprice = 0;
    this.finnhub.getQuote("IBM").subscribe(a => {
      // this.asset.updateQuote(a);
      console.log(this.asset); //object - prototype object
      console.log(this.asset.current); //undefined
      this.stockprice = this.asset.current;
      //this.asset = asset;
    });

    // this.candle = [];
    this.finnhub.getCandle("IBM", "D", "1572651390", "1575243390").subscribe(c=> {
      this.candle.updateCandle(c);
      console.log("candle :" + JSON.stringify(this.candle));
    });

  }

  ngOnInit(): void {
    console.log(2);
    // console.log("nginit asset: " + asset);
    // const api_key = finnhub.ApiClient.instance.authentications['api_key']; 
    // api_key.apiKey = "c1cepq748v6scqmqtk8g" // Replace this
    // const finnhubClient = new finnhub.DefaultApi()

    // let finQuote = finnhubClient.quote("IBM", (error: any, data: any, response: any) => {
    //   console.log(data);
    // });
  }

}

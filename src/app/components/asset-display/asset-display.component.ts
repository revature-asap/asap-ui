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

  asset!: assetQuote;

  // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  stockprice!: number;
  candle!: assetCandle;
  candleName!: string;
  candleOpen!: number[];
  candleHigh!: number[];
  candleLow!: number[];
  candleClose!: number[];
  candleVolume!: number[];
  candleTime!: string[];

  // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  // api_key.apiKey = "c1cepq748v6scqmqtk8g" // Replace this
  // const finnhubClient = new finnhub.DefaultApi()

  constructor(private finnhub: FinnhubService) {
    console.log(1);
    this.stockprice = 0;
    this.finnhub.getQuote("IBM").subscribe(a => {
      // this.asset.updateQuote(a);
      // console.log(this.asset); //object - prototype object
      // console.log(this.asset.current); //undefined
      // this.stockprice = this.asset.current;
      //this.asset = asset;
    });

    // this.candle = {} as assetCandle;
    this.candleTime = [];
    //console.log(this.candle);
    this.candleName = "IBM";
    this.finnhub.getCandle(this.candleName, "D", "1572651390", "1575243390").subscribe(c=> {
      this.candle = new assetCandle(c);
      this.candleClose = this.candle.close;
      this.candleOpen = this.candle.open;
      this.candleHigh = this.candle.high;
      this.candleLow = this.candle.low;
      this.candleVolume = this.candle.volume;
      //this.candleTime = this.candle.timestamp;
      //this.candleTime.pop;
      this.candle.timestamp.forEach(candleTimestamp => {
        let candleDate = new Date(candleTimestamp);
        this.candleTime.push(candleDate.toString());
      });
      //this.candleTime = this.candle.timestamp;
      // this.candleTime.forEach(candleT => {
      //   let candleDate = new Date(candleT);
      //   candleT = candleDate.toString();
      // });
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

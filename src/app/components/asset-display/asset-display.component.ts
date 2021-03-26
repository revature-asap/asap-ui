import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset';
import { FinnhubService } from '../../services/finnhub.service'
declare var finnhub: any;
// import * as Finnhub from '../../../assets/f'

@Component({
  selector: 'app-asset-display',
  templateUrl: './asset-display.component.html',
  styleUrls: ['./asset-display.component.css']
})
export class AssetDisplayComponent implements OnInit {
 
  //const finnhub = require('finnhub');

  stockprice: number;
  asset: Asset;
 
  // const api_key = finnhub.ApiClient.instance.authentications['api_key']; 
  // api_key.apiKey = "c1cepq748v6scqmqtk8g" // Replace this
  // const finnhubClient = new finnhub.DefaultApi()
  
  constructor(private finnhub: FinnhubService) { 
    console.log(1);
    this.asset = {
      
      o : 0,
      h : 0,
      l : 0,
      c : 0,
      pc : 0

    };
    this.stockprice = 0;
    this.finnhub.getQuote("IBM").subscribe(asset => {
      
      this.asset = asset;
      console.log(this.asset); //object - prototype object
      console.log(asset.c); //undefined
      this.stockprice = this.asset.c;
      //this.asset = asset;
    });
  }

  ngOnInit(): void {
    console.log(2);
    console.log("nginit asset: " + this.asset);
    // const api_key = finnhub.ApiClient.instance.authentications['api_key']; 
    // api_key.apiKey = "c1cepq748v6scqmqtk8g" // Replace this
    // const finnhubClient = new finnhub.DefaultApi()

    // let finQuote = finnhubClient.quote("IBM", (error: any, data: any, response: any) => {
    //   console.log(data);
    // });
  }

}

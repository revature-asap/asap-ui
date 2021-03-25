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

  stockname: string = "";
  asset: Asset;
 
  // const api_key = finnhub.ApiClient.instance.authentications['api_key']; 
  // api_key.apiKey = "c1cepq748v6scqmqtk8g" // Replace this
  // const finnhubClient = new finnhub.DefaultApi()
  
  constructor(private finnhub: FinnhubService) { 
    this.asset = {
      
      open : 0,
      high : 0,
      low : 0,
      current : 0,
      prevClose : 0

    };
  }

  ngOnInit(): void {
    
    this.finnhub.getQuote("IBM").subscribe(asset => {
      this.asset = asset;
      console.log(asset);
      //this.asset = asset;
    });
    // const api_key = finnhub.ApiClient.instance.authentications['api_key']; 
    // api_key.apiKey = "c1cepq748v6scqmqtk8g" // Replace this
    // const finnhubClient = new finnhub.DefaultApi()

    // let finQuote = finnhubClient.quote("IBM", (error: any, data: any, response: any) => {
    //   console.log(data);
    // });
  }

}

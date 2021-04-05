import { Component, Input, OnInit, Output } from '@angular/core';
import { companyProfile } from 'src/app/models/companyProfile';
import { assetQuote } from '../../models/assetQuote.model'


@Component({
  selector: 'app-ticker-card',
  templateUrl: './ticker-card.component.html',
  styleUrls: ['./ticker-card.component.css']
})
export class TickerCardComponent implements OnInit {
  @Input() asset!: assetQuote;
  @Input() companyName!: companyProfile;
  @Input() change!: number;

  trending = "";
  rate = {};
  tickerIcon = {};
  selectedPath!: string;
  path: string = "http://localhost:4200/companyDisplay";
  constructor() { }

  ngOnInit(): void {
    
    this.selectedPath = this.path + "?" + this.asset.companyTicker;
    console.log("selected asset ticker: " + this.asset.companyTicker);
    if(this.change < 0) {
      this.rate = {
        'color': 'red',
      }
      this.trending = "trending_down";
    }else {
      this.rate = {
        'color': 'green'
      }      
      this.trending = "trending_up";
    }


  }

  getUrl(ticker: string) {
    this.selectedPath = this.path + "?" + ticker;
    return this.selectedPath;
  }

}

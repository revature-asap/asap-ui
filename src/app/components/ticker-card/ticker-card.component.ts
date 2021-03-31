import { Component, Input, OnInit, Output } from '@angular/core';
import { assetProfile } from 'src/app/models/assetProfile';
import { assetQuote } from '../../models/assetQuote.model'

@Component({
  selector: 'app-ticker-card',
  templateUrl: './ticker-card.component.html',
  styleUrls: ['./ticker-card.component.css']
})
export class TickerCardComponent implements OnInit {
  @Input() asset!: assetQuote;
  @Input() companyName!: assetProfile;
  @Input() change!: number;
 
  trending = "";
  rate = {};
  tickerIcon = {};

  constructor() { }

  ngOnInit(): void {
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

}

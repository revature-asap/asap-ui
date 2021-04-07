import { Component, Input, OnInit, Output } from '@angular/core';
import { companyProfile } from 'src/app/models/companyProfile';
import { assetQuote } from '../../models/assetQuote.model'
import {Router} from "@angular/router";


@Component({
  selector: 'app-ticker-card',
  templateUrl: './ticker-card.component.html',
  styleUrls: ['./ticker-card.component.css']
})
export class TickerCardComponent implements OnInit {
  @Input() asset!: assetQuote;
  @Input() companyName!: companyProfile;
  @Input() change!: number;
  //change=this.asset.change;
  //change=0;
  trending = "";
  rate = {};
  tickerIcon = {};
  selectedPath!: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.asset.change < 0) {
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

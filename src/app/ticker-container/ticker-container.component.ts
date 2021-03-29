import { Component, OnInit } from '@angular/core';
import { FinnhubService } from '../services/finnhub.service';
import { assetQuote } from '../models/assetQuote'

@Component({
  selector: 'app-ticker-container',
  templateUrl: './ticker-container.component.html',
  styleUrls: ['./ticker-container.component.css']
})
export class TickerContainerComponent implements OnInit {

  assetQuotes:Array<assetQuote> = new Array(); // = [new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote()];
  constructor(private finnhubService:FinnhubService) { }

  ngOnInit(): void {
    this.finnhubService.getQuote("APPL").subscribe(a=>{this.assetQuotes.push(a)});
    this.finnhubService.getQuote("APPL").subscribe(a=>{this.assetQuotes.push(a)});
    this.finnhubService.getQuote("APPL").subscribe(a=>{this.assetQuotes.push(a)});
    this.finnhubService.getQuote("APPL").subscribe(a=>{this.assetQuotes.push(a)});
  }

}

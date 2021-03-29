import { Component, OnInit } from '@angular/core';
import { FinnhubService } from '../services/finnhub.service';
import { assetQuote } from '../models/assetQuote.model'

@Component({
  selector: 'app-ticker-container',
  templateUrl: './ticker-container.component.html',
  styleUrls: ['./ticker-container.component.css']
})
export class TickerContainerComponent implements OnInit {

  assetQuotes:assetQuote[] = []; // = [new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote()];
  constructor(private finnhubService:FinnhubService) { }

  ngOnInit(): void {
    this.finnhubService.getQuote("APPL")
        .subscribe((assets: assetQuote)=>{
          this.assetQuotes.push(assets);
        });

  }

}

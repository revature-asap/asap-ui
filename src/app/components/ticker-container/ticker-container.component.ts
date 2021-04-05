import { Component, OnInit } from '@angular/core';
import { FinnhubService } from '../../services/finnhub.service';
import { assetQuote } from '../../models/assetQuote.model';
import { TickerService } from 'src/app/services/ticker.service';
import { companyProfile } from 'src/app/models/companyProfile';

@Component({
  selector: 'app-ticker-container',
  templateUrl: './ticker-container.component.html',
  styleUrls: ['./ticker-container.component.css']
})
export class TickerContainerComponent implements OnInit {

  asset!: assetQuote;
  change!: number;
  assetQuotes:assetQuote[] = []; // = [new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote()];
  constructor(private finnhubService:FinnhubService, public tickerService: TickerService) { }

  ngOnInit(): void {
    
    this.finnhubService.getQuote("AAPL")
        .subscribe((asseta)=>{
          this.asset = new assetQuote(asseta);
          this.asset.companyTicker = "AAPL";

          this.change = this.tickerService.computeChange(this.asset.current, this.asset.previousClose);

          this.finnhubService.getProfile("AAPL")
          .subscribe((profile: companyProfile)=> {
            this.asset.companyName = profile.name;
            this.assetQuotes.push(this.asset);
          });

        });


  }

}

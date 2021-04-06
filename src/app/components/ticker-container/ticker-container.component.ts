import { Component, OnInit } from '@angular/core';
import { FinnhubService } from '../../services/finnhub.service';
import { assetQuote } from '../../models/assetQuote.model'
import { companyProfile } from 'src/app/models/companyProfile';
import { TickerService } from 'src/app/services/ticker.service';
import {LoginService} from "../../services/login.service";
import {WatchListService} from "../../services/watch-list.service";

@Component({
  selector: 'app-ticker-container',
  templateUrl: './ticker-container.component.html',
  styleUrls: ['./ticker-container.component.css']
})
export class TickerContainerComponent implements OnInit {

  stringOfAssets: string[] = [];
  asset!: assetQuote;
  change!: number;
  assetQuotes:assetQuote[] = []; // = [new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote()];
  constructor(private finnhubService:FinnhubService, public tickerService: TickerService, private loginService: LoginService, private watchlistService: WatchListService) { }

  ngOnInit(): void {
    this.assetQuotes = [];
    let assetNames: string[] = [];
    this.loginService.currentUser$.subscribe(
      async (user) => {
        if (user != null) {
          let companies = await this.watchlistService.fetchUserWatchList();
          if(companies.length > 0){
            for (const company of companies) {
              assetNames.push(company.ticker);
            }
          }
        }else{
          assetNames = ['AAPL', 'GME', 'GOOG', 'AMZN', 'MSFT', 'TSLA'];
        }
      });

    for (const assetName of assetNames) {
      console.log(assetName);
      this.finnhubService.getQuote(assetName)
        .subscribe((asseta)=>{
          this.asset = new assetQuote(asseta);
          this.asset.companyTicker = assetName;

          this.change = this.tickerService.computeChange(this.asset.current, this.asset.previousClose);

          this.finnhubService.getProfile(assetName)
            .subscribe((profile: companyProfile) => {
              this.asset.companyName = profile.name;
              this.assetQuotes.push(this.asset);
            });

        });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FinnhubService } from '../../services/finnhub.service';
import { assetQuote } from '../../models/assetQuote.model'
import { companyProfile } from 'src/app/models/companyProfile';
import { TickerService } from 'src/app/services/ticker.service';
import {LoginService} from "../../services/login.service";
import {WatchListService} from "../../services/watch-list.service";
import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-ticker-container',
  templateUrl: './ticker-container.component.html',
  styleUrls: ['./ticker-container.component.css']
})
export class TickerContainerComponent implements OnInit {

  asset!: assetQuote;
  change!: number;
  assetQuotes:assetQuote[] = []; // = [new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote(), new assetQuote()];
  constructor(private finnhubService:FinnhubService, public tickerService: TickerService, private loginService: LoginService, private watchlistService: WatchListService) { }

  ngOnInit(): void{
    let assetNames:string[] = [];
    this.loginService.currentUser$.subscribe(
      async (user) => {
        if (user != null) {
          let companies = await this.watchlistService.fetchUserWatchList();
          for (const company of companies) {
            assetNames.push(company.ticker);
          }
          await this.displayListOfTickers(assetNames).then();
          if(companies.length <= 6){
            let defaults = ['AAPL', 'GME', 'GOOG', 'AMZN', 'MSFT', 'TSLA'];
            let rest: string[] = [];
            for (const ticker of defaults) {
              if(!assetNames.includes(ticker)){
                rest.push(ticker);
              }
            }
            this.displayListOfTickers(rest).then();
          }
        }else{
          assetNames = ['AAPL', 'GME', 'GOOG', 'AMZN', 'MSFT', 'TSLA'];
          this.displayListOfTickers(assetNames).then();
        }
      });
  }

  displayListOfTickers = async (assetNames: string[]) => {
    for (let assetName of assetNames) {
      console.log("asset name: " + assetName);
      this.finnhubService.getQuote(assetName)
        .subscribe((asseta)=>{
          let asset = new assetQuote(asseta);
          asset.companyTicker = assetName;

          this.change = this.tickerService.computeChange(asset.current, asset.previousClose);
          console.log("within first subscribe " + asset.companyTicker);
          this.finnhubService.getProfile(assetName)
            .subscribe((profile: companyProfile) => {
              asset.companyName = profile.name;
              this.assetQuotes.push(asset);
            });

        });
    }
    console.log("end of the list of displayed tickers ");
  }

}

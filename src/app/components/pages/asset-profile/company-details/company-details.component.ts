import { Component, Input, OnInit } from '@angular/core';
import { assetQuote } from 'src/app/models/assetQuote.model';
import { companyProfile } from 'src/app/models/companyProfile';
import { Principal } from 'src/app/models/principal';
import { LoginService } from 'src/app/services/login.service';
import { WatchListService } from 'src/app/services/watch-list.service';
import { FinnhubService } from '../../../../services/finnhub.service';
import { ActivatedRoute } from '@angular/router';

//Component used as the source or top level component for the asset display page that appears after navigating to a particular stock either through the search bar or 
//by clicking on a card on the main page.
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  asset!: assetQuote;
  profile!: companyProfile;
  ticker!: string;
  companyName!: string;
  isFavorited: boolean = false;
  loggedIn!: Principal | null;
  watchList!: companyProfile[];
  logo!: string;

  clearbitUrl: string = "https://logo.clearbit.com/";

  constructor(private finnhub: FinnhubService, private loginService: LoginService, private watchListService: WatchListService, private _Activatedroute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.checkLoggedIn();
    this.ticker = this._Activatedroute.snapshot.paramMap.get("tickerId") || '{}';

    //get profile information from backend api 
    this.finnhub.getProfile(this.ticker!).subscribe((profile: companyProfile) => {
      this.profile = profile;
      this.setLogo();
      if (this.loggedIn) {
        this.setWatchList();
        this.checkIfFavorited();
      }
    });

    /** The following call series checks finnhub for a ticker then goes to lunar crush to overwrite the returns 
     * --aka we provide information for cryptos over regular stocks if a ticker matches
     */
    //get up to date stock financial data directly from a call to finnhub in the finnhub.service in our angular application
    this.finnhub.getQuote(this.ticker!).subscribe((quote: assetQuote) => {
      this.asset = new assetQuote(quote);
      //attempt to call lunar crush to override the data displayed for the stock as a regular stock if any was returned
      this.finnhub.getLunarCrushQuote(this.ticker!).subscribe((quote: any) => {
        if (!(quote.message == "Internal server error")) {
          this.mapLunarCrushQuote(quote);
        }
      });
    });

  }

  //map return from lunar crush to our asset display 
  mapLunarCrushQuote(newQuote: any) {
    this.asset.open = newQuote.data[0].open;
    this.asset.high = newQuote.data[0].high;
    this.asset.low = newQuote.data[0].low;
    this.asset.current = newQuote.data[0].price;
    this.asset.previousClose = newQuote.data[0].timeSeries[0].close;
    this.asset.companyName = newQuote.data[0].name;
    this.asset.companyTicker = newQuote.data[0].symbol;
  }

  //get the logo from our clearbit api
  setLogo() {
    let strippedUrl = this.profile?.weburl;
    strippedUrl = strippedUrl.replace('https://', '');
    strippedUrl = strippedUrl.replace('www.', '');
    strippedUrl = strippedUrl.replace('/en-us', '');
    this.logo = this.clearbitUrl + strippedUrl;
  }

  //check if a user is logged in for the logged in display options (favorites button)
  checkLoggedIn() {
    this.loginService.currentUser$.subscribe(
      user => {
        this.loggedIn = user;
      }
    );

  }

  //setting watch list for the company details
  setWatchList() {
    console.log("Set watch list");
    this.watchList = this.watchListService.getCompanyProfile();
    if (this.watchList == null) {
      this.watchListService.fetchUserWatchList().then();
      this.watchList = this.watchListService.getCompanyProfile();
    }
  }

  //check to see if a stock is already favorited by a checked in user to determine whether to display favorite button
  checkIfFavorited() {
    for (let i = 0; i < this.watchList.length; i++) {
      if (this.watchList[i].ticker == this.profile.ticker) {
        this.isFavorited = true;
      }
    }
  }

  //add a stock to the users favorite list after a click on the favorites button
  addFavorites(): void {
    this.watchListService.insertFavorite(this.profile);
    this.isFavorited = true;
    this.watchList = this.watchListService.getCompanyProfile();
  }

}

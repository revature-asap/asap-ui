import { Component, Input, OnInit } from '@angular/core';
import { assetQuote } from 'src/app/models/assetQuote.model';
import { companyProfile } from 'src/app/models/companyProfile';
import { Principal } from 'src/app/models/principal';
import { LoginService } from 'src/app/services/login.service';
import { WatchListService } from 'src/app/services/watch-list.service';
import { FinnhubService } from '../../../../services/finnhub.service';
import { ActivatedRoute } from '@angular/router';
import { AssetCandleChartComponent } from 'src/app/components/asset-candle-chart/asset-candle-chart.component';


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
    console.log("TICKER in company details component: " + this.ticker);

    this.finnhub.getProfile(this.ticker!).subscribe((profile: companyProfile) => {
      this.profile = profile;
      this.setLogo();
      if (this.loggedIn) {
        this.setWatchList();
        this.checkIfFavorited();
      }
      console.log("profile returned from finnhb service: " + JSON.stringify(this.profile));
    });

    this.finnhub.getQuote(this.ticker!).subscribe((quote: assetQuote) => {
      console.log("getting quote from finnhub");
      this.asset = new assetQuote(quote);
      console.log("getting quote for company details component - " + JSON.stringify(this.asset));
      this.finnhub.getLunarCrushQuote(this.ticker!).subscribe((quote: any) => {
        console.log("got quote from lunar crush- " + JSON.stringify(quote));
        console.log("getting coin price: " + quote.data[0].price);
        console.log("getting close from lunar crush: " + JSON.stringify(quote.data[0].timeSeries[0].close));
        this.mapLunarCrushQuote(quote);
        console.log("got quote for lunar crush display- " + JSON.stringify(this.asset));
      });
    });


    // this.finnhub.getLunarCrushQuote(this.ticker!).subscribe((quote: any) => {
    //   console.log("got quote from lunar crush- " + JSON.stringify(quote));
    //   console.log("getting coin price: " + quote.data[0].price);
    //   console.log("getting close from lunar crush: " + JSON.stringify(quote.data[0].timeSeries[0].close));
    //   this.mapLunarCrushQuote(quote);
    //   console.log("got quote for lunar crush display- " + JSON.stringify(this.asset));
    // });


    //get lunar crush quote
    //would have to do some mappings probs

  }


  mapLunarCrushQuote(newQuote: any)  {
    console.log("mapping lunar crush quote: " + JSON.stringify(newQuote));
    console.log("mapping lunar crush open data: " + newQuote.data[0].open);

    this.asset.open = newQuote.data[0].open;
    console.log("mapped open: " + this.asset.open);
    this.asset.high = newQuote.data[0].high;
    this.asset.low = newQuote.data[0].low;
    this.asset.current = newQuote.data[0].price;
    this.asset.previousClose = newQuote.data[0].timeSeries[0].close;
    this.asset.companyName = newQuote.data[0].name;
    this.asset.companyTicker = newQuote.data[0].symbol;
    console.log("asset mapped: " + JSON.stringify(this.asset));
  }

  setLogo() {
    let strippedUrl = this.profile?.weburl;
    console.log("stripped url from profile: " + strippedUrl);
    strippedUrl = strippedUrl.replace('https://', '');
    strippedUrl = strippedUrl.replace('www.', '');
    strippedUrl = strippedUrl.replace('/en-us', '');
    this.logo = this.clearbitUrl + strippedUrl;
    console.log("setting logo in company details component to: " + this.logo);
  }

  checkLoggedIn() {
    this.loginService.currentUser$.subscribe(
      user => {
        this.loggedIn = user;
      }
    );

  }

  setWatchList() {
    console.log("Set watch list");
    this.watchList = this.watchListService.getCompanyProfile();

    if (this.watchList == null) {
      this.watchListService.fetchUserWatchList().then();
      this.watchList = this.watchListService.getCompanyProfile();
    }
  }

  checkIfFavorited() {
    console.log("Inside the checkifFavorited");
    for (let i = 0; i < this.watchList.length; i++) {
      if (this.watchList[i].ticker == this.profile.ticker) {
        console.log(this.watchList[i].ticker);
        this.isFavorited = true;
      }
    }

    console.log("Favorite boolean is " + this.isFavorited);

  }

  addFavorites(): void {
    console.log("IM in addfavorite Method!");
    this.watchListService.insertFavorite(this.profile);
    this.isFavorited = true;
    this.watchList = this.watchListService.getCompanyProfile();
  }

}

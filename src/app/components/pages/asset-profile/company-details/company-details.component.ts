import { Component, Input, OnInit } from '@angular/core';
import { assetQuote } from 'src/app/models/assetQuote.model';
import { companyProfile } from 'src/app/models/companyProfile';
import { Principal } from 'src/app/models/principal';
import { LoginService } from 'src/app/services/login.service';
import { WatchListService } from 'src/app/services/watch-list.service';
import { FinnhubService } from '../../../../services/finnhub.service';
import { ActivatedRoute } from '@angular/router';


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

  constructor(private finnhub: FinnhubService, private loginService: LoginService, private watchListService: WatchListService, private _Activatedroute:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.checkLoggedIn();

    if (this.loggedIn) {
      this.setWatchList();
      this.checkIfFavorited();
    }

    // console.log("location search: " + location.search.substring(1));
    // this.ticker = location.search.substring(1);
    // this.ticker = this.ticker.substring(0, this.ticker.length - 1);
     this.ticker = this._Activatedroute.snapshot.paramMap.get("tickerId") || '{}';
     console.log("TICKER in company details component: " + this.ticker);

    this.finnhub.getProfile(this.ticker!).subscribe((profile: companyProfile) => {
      this.profile = profile;
      let strippedUrl = this.profile.weburl;
      console.log("url from profile: " + strippedUrl);
      strippedUrl = strippedUrl.replace('https://www.', '');
      this.logo = this.clearbitUrl + strippedUrl;
      console.log("setting logo in company details component to: " + this.logo);
      //console.log("profile returned from finnhb service: " + this.profile);
    });

    this.finnhub.getQuote(this.ticker!).subscribe((quote: assetQuote) => {
      this.asset = new assetQuote(quote);
      //console.log("getting quote for company details component - " + JSON.stringify(this.asset));
    });

    //making call to finnhub service just to minimize number of services being used even though it will be calling
    // a different endpoint api to get the logo
    //actually = get logo would be really easy
    // this.setLogo();

  }


  // setLogo() {
  //   let strippedUrl = this.profile?.weburl;
  //   console.log("stripped url from profile: " + strippedUrl);
  //   strippedUrl = strippedUrl.replace('www.', '');
  //   this.logo = this.clearbitUrl + strippedUrl;
  //   console.log("setting logo in company details component to: " + this.logo);
  // }

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

  checkIfFavorited(){
    console.log("Inside the checkifFavorited");
    for (let i = 0; i < this.watchList.length; i++) {
      if (this.watchList[i].ticker == this.profile.ticker) {
        console.log(this.watchList[i].ticker);
        this.isFavorited = true;
      }
    }

    console.log("Favorite boolean is " + this.isFavorited);

  }

  addFavorites():void {
    console.log("IM in addfavorite Method!");
    this.watchListService.insertFavorite(this.profile);
    this.isFavorited = true;
    this.watchList = this.watchListService.getCompanyProfile();
  }

}

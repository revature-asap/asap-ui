import { Component, Input, OnInit } from '@angular/core';
import { assetQuote } from 'src/app/models/assetQuote.model';
import { companyProfile } from 'src/app/models/companyProfile';
import { Principal } from 'src/app/models/principal';
import { LoginService } from 'src/app/services/login.service';
import { WatchListService } from 'src/app/services/watch-list.service';
import { FinnhubService } from '../../../../services/finnhub.service';

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



  constructor(private finnhub: FinnhubService, private loginService: LoginService, private watchListService: WatchListService) {

  }

  ngOnInit(): void {
  this.checkLoggedIn();

    if (this.loggedIn) {
      this.setWatchList();
      this.checkIfFavorited();
    }
    console.log("location search: " + location.search.substring(1));
    this.ticker = location.search.substring(1);
    this.ticker = this.ticker.substring(0, this.ticker.length - 1);
    console.log("TICKER IN QUESTION: " + this.ticker);
    this.finnhub.getProfile(this.ticker!).subscribe((profile: companyProfile) => {
      this.profile = profile;
      //console.log(this.profile);
      // this.ticker = profile.ticker;
      // this.companyName = profile.name;
    });

    this.finnhub.getQuote(this.ticker!).subscribe((quote: assetQuote) => {
      this.asset = new assetQuote(quote);
      //console.log("getting quote for company details component - " + JSON.stringify(this.asset));
    });


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
        this.watchListService.fetchUserWatchList();
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
    this.watchListService.insertFavorite(this.profile);
    this.isFavorited = true;
    this.watchList = this.watchListService.getCompanyProfile();
  }

}

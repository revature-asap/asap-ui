import { Component, OnInit } from '@angular/core';
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

  profile!: companyProfile;
  ticker!: string;
  companyName!: string;
  asset!: assetQuote;
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

    this.finnhub.getProfile("IBM").subscribe((profile: companyProfile) => {
      this.profile = profile;
      console.log(this.profile);
      // this.ticker = profile.ticker;
      // this.companyName = profile.name;
    });

    this.finnhub.getQuote("IBM").subscribe((quote: assetQuote) => {
      this.asset = new assetQuote(quote);
      console.log("getting quote for company details component - " + JSON.stringify(this.asset));
      // this.asset.updateQuote(a);
      // console.log(this.asset); //object - prototype object
      // console.log(this.asset.current); //undefined
      // this.stockprice = this.asset.current;
      //this.asset = asset;
    });

    let imageUrl = 'https://finnhub.io/api/logo?symbol=IBM';

    // this.getBase64ImageFromURL(imageUrl).subscribe((base64data: string) => {    
    //   console.log("base image: " + base64data);
    //   // this is the image as da taUrl
    //   this.base64Image = 'data:image/jpg;base64,' + base64data;
    // });


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

import {Component, Input, OnInit} from '@angular/core';
import {assetQuote} from "../../../../models/assetQuote.model";
import {companyProfile} from "../../../../models/companyProfile";
import {Principal} from "../../../../models/principal";
import {FinnhubService} from "../../../../services/finnhub.service";
import {LoginService} from "../../../../services/login.service";
import {WatchListService} from "../../../../services/watch-list.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-abbr-comp-deets',
  templateUrl: './abbr-comp-deets.component.html',
  styleUrls: ['./abbr-comp-deets.component.css']
})
export class AbbrCompDeetsComponent implements OnInit {

  asset!: assetQuote;
  profile!: companyProfile;
  @Input() ticker!: string;
  isFavorited: boolean = false;
  watchList!: companyProfile[];
  logo!: string;

  clearbitUrl: string = "https://logo.clearbit.com/";

  constructor(private finnhub: FinnhubService, private loginService: LoginService, private watchListService: WatchListService, 
    private _Activatedroute:ActivatedRoute, private router:Router) {

  }

  ngOnInit(): void {

    // console.log("location search: " + location.search.substring(1));
    // this.ticker = location.search.substring(1);
    // this.ticker = this.ticker.substring(0, this.ticker.length - 1);

    this.finnhub.getProfile(this.ticker!).subscribe((profile: companyProfile) => {
      this.profile = profile;
      let strippedUrl = this.profile.weburl;
      strippedUrl = strippedUrl.replace('https://www.', '');
      this.logo = this.clearbitUrl + strippedUrl;
    });

    this.finnhub.getQuote(this.ticker!).subscribe((quote: assetQuote) => {
      this.asset = new assetQuote(quote);
      //console.log("getting quote for company details component - " + JSON.stringify(this.asset));
    });

  }

  goToAsset(ticker:String){
    this.router.navigate(['companyDisplay' + '/'+ticker]);
  }

}

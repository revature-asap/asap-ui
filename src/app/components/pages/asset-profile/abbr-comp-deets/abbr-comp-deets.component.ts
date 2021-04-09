import {Component, Input, OnInit} from '@angular/core';
import {assetQuote} from "../../../../models/assetQuote.model";
import {companyProfile} from "../../../../models/companyProfile";
import {FinnhubService} from "../../../../services/finnhub.service";
import {LoginService} from "../../../../services/login.service";
import {WatchListService} from "../../../../services/watch-list.service";
import {ActivatedRoute, Router} from "@angular/router";

/**
 * This component is for showing just the company information and
 * the sentiment analysis for the user's watchlist
 */
@Component({
  selector: 'app-abbr-comp-deets',
  templateUrl: './abbr-comp-deets.component.html',
  styleUrls: ['./abbr-comp-deets.component.css']
})
export class AbbrCompDeetsComponent implements OnInit {

  asset!: assetQuote;
  profile!: companyProfile;
  @Input() ticker!: string;
  watchList!: companyProfile[];
  logo!: string;

  clearbitUrl: string = "https://logo.clearbit.com/";

  constructor(private finnhub: FinnhubService, private loginService: LoginService, private watchListService: WatchListService,
    private _Activatedroute:ActivatedRoute, private router:Router) {

  }

  /**
   * Upon initialization, the company profile and ticker information is grabbed
   */
  ngOnInit(): void {
    this.finnhub.getProfile(this.ticker!).subscribe((profile: companyProfile) => {
      this.profile = profile;
      let strippedUrl = this.profile.weburl;
      strippedUrl = strippedUrl.replace('https://www.', '');
      this.logo = this.clearbitUrl + strippedUrl;
    });
    this.finnhub.getQuote(this.ticker!).subscribe((quote: assetQuote) => {
      this.asset = new assetQuote(quote);
    });

  }

  /**
   * When the ticker is clicked, the user is redirected to the asset
   * display page
   * @param ticker
   */
  goToAsset(ticker:String){
    this.router.navigate(['companyDisplay' + '/'+ticker]);
  }

}

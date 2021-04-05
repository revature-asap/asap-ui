import { Component, Input, OnInit } from '@angular/core';
import { assetQuote } from 'src/app/models/assetQuote.model';
import { companyProfile } from 'src/app/models/companyProfile';
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
  //asset!: assetQuote;


  constructor(private finnhub: FinnhubService) { 

  }

  ngOnInit(): void {
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

}

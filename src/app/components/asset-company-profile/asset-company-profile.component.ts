import { Component, OnInit } from '@angular/core';
import { finnhubAssetProfile } from '../../models/finnhubAssetProfile';
import { FinnhubService } from '../../services/finnhub.service'

@Component({
  selector: 'app-asset-company-profile',
  templateUrl: './asset-company-profile.component.html',
  styleUrls: ['./asset-company-profile.component.css']
})
export class AssetCompanyProfileComponent implements OnInit {

  exchange!: string;
  industry!: string;
  ipo!: Date;
  logo!: string;
  marketCap!: number;
  name!: string;
  number!: number;
  outstandingShares!: number;
  url!: string;


  constructor(private finnhub: FinnhubService) {
    
    //returning a finnhubAssetProfile obj
    this.finnhub.getFinnhubProfile("IBM").subscribe(response => 
      {
        this.exchange = response.exchange;
      })

  }

  ngOnInit(): void {
  }

}

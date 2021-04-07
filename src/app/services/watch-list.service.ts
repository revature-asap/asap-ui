import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LoginService } from './login.service';
import {map, tap} from "rxjs/operators";
import { formatDate } from '@angular/common';
import { companyProfile } from '../models/companyProfile';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  private currentUserWatchList = new Subject<companyProfile[]>();
  private currentWatchList: companyProfile[] = [];
  fetchAssetUrl = 'http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/users/watchlist/';

  constructor(private httpClient: HttpClient, private loginService: LoginService) {
  }

  getCompanyProfile() {
    return this.currentWatchList;
  }

  fetchUserWatchList() : Promise<companyProfile[]> {
        return this.httpClient.get<companyProfile[]>(this.fetchAssetUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
      observe: 'response'
    }).pipe(
      map(resp => {
        const assetProfile1 = resp.body as companyProfile[];
        this.currentWatchList = assetProfile1;
        this.currentUserWatchList.next(assetProfile1);
        return assetProfile1;
      })
    ).toPromise()

  }

  insertFavorite(userTicker: companyProfile) {
    console.log(this.fetchAssetUrl+userTicker.ticker);
    this.httpClient.post<any>(this.fetchAssetUrl + userTicker.ticker, {
    }).subscribe();
    this.currentWatchList.push(userTicker);
    this.currentUserWatchList.next(this.currentWatchList);
  }
}

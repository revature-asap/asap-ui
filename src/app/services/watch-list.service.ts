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

  // private tempCurrentUserWatchList: Subject<assetProfile[]| null>;
  // private tempCurrentWatchList$: assetProfile = null
  fetchAssetUrl = `http://localhost:5000/users/watchlist/`;
  //loginUrl = 'http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/users/login';
  constructor(private httpClient: HttpClient, private loginService: LoginService) {
  }



      // //Pulled from ASAP API
      // id: number; //made by ASAP API
      // name: string; //Asset's full name
      // ticker: string; //Exchange abbreviation for asset
      // imageUrl: string; //url on finn
      // marketCap: number; //Specific to stocks: "Defnitions may vary"
      // shareOutstanding: number; //Specific to Stocks
      // industryCategory: string; //Potentially used for searching purposes
      // websiteUrl: string;
      // lastTouchedTimestamp: Date; //Not sure about this one
  getCompanyProfile() {
    return this.currentWatchList;
  }

  fetchUserWatchList() : Promise<companyProfile[]> {
    this.loginService.currentUser$.subscribe(
      user => {
        this.fetchAssetUrl+= user?.id;
      }
    );

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

    this.httpClient.post(this.fetchAssetUrl + userTicker.ticker, {

    }).pipe(
      map(data => {this.currentWatchList.push(userTicker); this.currentUserWatchList.next(this.currentWatchList)})
    );

  }
  // authenticate(un: string, pw: string): Promise<any> {
  //   let creds = new Credentials(un, pw);
  //   // @ts-ignore
  //   return this.httpClient.post(this.loginUrl, creds, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     observe: 'response'
  //   }).pipe(
  //     // @ts-ignore
  //     map(resp => {
  //       const token = resp.headers.get('ASAP-token');
  //       this.setToken(token);
  //       const principal = resp.body as Principal;
  //       this.currentUserSubject.next(principal);
  //       return principal;
  //     })
  //   ).toPromise();
  // }

  // this.watchListService.insertFavorite('IBM');
}

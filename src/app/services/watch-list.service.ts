import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { assetProfile } from '../models/assetProfile';
import { LoginService } from './login.service';
import {map} from "rxjs/operators";
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WatchListService {

  private currentUserWatchList: BehaviorSubject<assetProfile[] | null>;
  currentWatchList$: Observable<assetProfile[] | null>;

  // private tempCurrentUserWatchList: Subject<assetProfile[]| null>;
  // private tempCurrentWatchList$: assetProfile = null
  fetchAssetUrl = `http://localhost:5000/assets/assetUser/`;
  //loginUrl = 'http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/users/login';
  tempAssetProfileChanged = new Subject<assetProfile[]>();
  assetProfile1: assetProfile[] = [];
  constructor(private httpClient: HttpClient, private loginService: LoginService) { 
    this.currentUserWatchList = new BehaviorSubject<assetProfile[]| null>(null);
    this.currentWatchList$ = this.currentUserWatchList.asObservable();
  }

  setUserWatchList() {

    let p1 = {"id": 1, "name": "Calvin", "ticker": "GME", "imageUrl": "https://source.unsplash.com/random/200x200", "marketCap": 23, "shareOutstanding": 400, "industryCategory": "technology", "websiteUrl": "www.google.com", "lastTouchedTimestamp": new Date()};
    let p2 = {"id": 2, "name": "Calvin", "ticker": "GME", "imageUrl": "https://source.unsplash.com/random/200x200", "marketCap": 23, "shareOutstanding": 400, "industryCategory": "technology", "websiteUrl": "www.google.com", "lastTouchedTimestamp": new Date()};
    let p3 = {"id": 3, "name": "Calvin", "ticker": "GME", "imageUrl": "https://source.unsplash.com/random/200x200", "marketCap": 23, "shareOutstanding": 400, "industryCategory": "technology", "websiteUrl": "www.google.com", "lastTouchedTimestamp": new Date()};
    let p4 = {"id": 4, "name": "Calvin", "ticker": "GME", "imageUrl": "https://source.unsplash.com/random/200x200", "marketCap": 23, "shareOutstanding": 400, "industryCategory": "technology", "websiteUrl": "www.google.com", "lastTouchedTimestamp": new Date()};
    this.assetProfile1.push(p1);
    this.assetProfile1.push(p2);
    this.assetProfile1.push(p3);
    this.assetProfile1.push(p4);

    this.tempAssetProfileChanged.next(this.assetProfile1); 
  }

  getUserWatchList(): assetProfile[] {
    return this.assetProfile1;
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

  // getUserWatchList() : Promise<assetProfile[]> {
  //   this.loginService.currentUser$.subscribe(
  //     user => {
  //       this.fetchAssetUrl+= user?.id;
  //     }
  //   );

  //   return this.httpClient.get<assetProfile[]>(this.fetchAssetUrl, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     observe: 'response'
  //   }).pipe(
  //     map(resp => {

  //       const assetProfile1 = resp.body as assetProfile[];
  //       this.currentUserWatchList.next(assetProfile1);
  //       return assetProfile1;
  //     })
  //   ).toPromise()
    
  // }
}
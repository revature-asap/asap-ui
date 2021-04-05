import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { assetQuote } from '../models/assetQuote.model';
import { assetCandle } from '../models/assetCandle';

import {Observable} from 'rxjs';
import { assetProfile } from '../models/assetProfile';
import { companyProfile } from '../models/companyProfile';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'X-Finnhub-Token': 'c1ceppv48v6scqmqtk5g'
  })
}


@Injectable({
  providedIn: 'root'
})
export class FinnhubService {

  constructor(private http: HttpClient) { }

  api_url: string = "https://finnhub.io/api/v1";
  quoteUrl: string = "/quote?symbol=";
  candleUrl: string = "/stock/candle?symbol=";
  profileUrl: string = "/stock/profile2?symbol=";
  
  //real backend: http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000
  backendProfileInfo: string = "http://localhost:5000/asset?ticker="

  token:string = "&token=c1ceppv48v6scqmqtk5g"

  getQuote(ticker: string):Observable<assetQuote> {
    //console.log("in get quote with ticker: " + ticker);
    console.log("Inside not test " + `${this.api_url + this.quoteUrl + ticker + this.token}`);
    return this.http.get<assetQuote>(`${this.api_url + this.quoteUrl + ticker + this.token}`);
  }

  //should pull from backend api to display profile information for given asset with database/finnhub/lunarcrush being checked for info in order
  getProfile(ticker: string):Observable<companyProfile> {
    //console.log("in get quote with ticker: " + ticker);
    return this.http.get<companyProfile>(`${this.backendProfileInfo + ticker}`);
  }

  getCandle(ticker: string, resolution: string, start: string, end: string):Observable<assetCandle> {
    //console.log("in get candle with ticker: " + ticker);
    resolution = "&resolution=" + resolution;
    start = "&from=" + start;
    end = "&to=" + end;
    //console.log("URL on getCandle: " + this.api_url + this.candleUrl + resolution + start + end);
    return this.http.get<assetCandle>(`${this.api_url + this.candleUrl + ticker + resolution + start + end + this.token}`);
  }


}

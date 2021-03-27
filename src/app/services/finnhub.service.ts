import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { assetQuote } from '../models/assetQuote';
import { assetCandle } from '../models/assetCandle';
import { finnhubAssetProfile } from 'src/app/models/finnhubAssetProfile';

import {Observable} from 'rxjs';
import { Time } from '@angular/common';

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
  finnhubProfileUrl: string = "/stock/profile2?symbol=";
  
  token:string = "&token=c1ceppv48v6scqmqtk5g"
  
  getQuote(ticker: string):Observable<assetQuote> {
    console.log("in get quote with ticker: " + ticker);
    return this.http.get<assetQuote>(`${this.api_url + this.quoteUrl + ticker + this.token}`);
  }

  getCandle(ticker: string, resolution: string, start: string, end: string):Observable<assetCandle[]> {
    console.log("in get candle with ticker: " + ticker);
    resolution = "&resolution=" + resolution;
    start = "&from=" + start;
    end = "&to=" + end;
    console.log("URL on getCandle: " + this.api_url + this.candleUrl + ticker + resolution + start + end + this.token);
    return this.http.get<assetCandle[]>(`${this.api_url + this.candleUrl + ticker + resolution + start + end + this.token}`);
  }

  getFinnhubProfile(ticker: string):Observable<finnhubAssetProfile> {
    console.log("in get profile with ticker: " + ticker);
    console.log("URL on getProfile: " + this.api_url + this.finnhubProfileUrl + ticker + this.token);
    return this.http.get<finnhubAssetProfile>(`${this.api_url + this.finnhubProfileUrl + ticker + this.token}`);
  }

}

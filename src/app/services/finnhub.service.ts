import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { assetQuote } from '../models/assetQuote.model';
import { assetCandle } from '../models/assetCandle';

import {Observable} from 'rxjs';
import { assetProfile } from '../models/assetProfile';

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

  tokens: string[] = ["&token=c1ceppv48v6scqmqtk5g", "&token=c1cepq748v6scqmqtk8g", "&token=c1cf0gf48v6scqmqtr50"]; 

  api_url: string = "https://finnhub.io/api/v1";
  quoteUrl: string = "/quote?symbol=";
  candleUrl: string = "/stock/candle?symbol=";
  profileUrl: string = "/stock/profile2?symbol=";

  getQuote(ticker: string):Observable<assetQuote> {
    //console.log("in get quote with ticker: " + ticker);
    console.log("Inside not test " + `${this.api_url + this.quoteUrl + ticker }${this.tokens[this.getToken()]}`);
    return this.http.get<assetQuote>(`${this.api_url + this.quoteUrl + ticker }${this.tokens[this.getToken()]}`);
  }

  getProfile(ticker: string):Observable<assetProfile> {
    //console.log("in get quote with ticker: " + ticker);
    return this.http.get<assetProfile>(`${this.api_url + this.profileUrl + ticker}${this.tokens[this.getToken()]}`);
  }

  getCandle(ticker: string, resolution: string, start: string, end: string):Observable<assetCandle> {
    //console.log("in get candle with ticker: " + ticker);
    resolution = "&resolution=" + resolution;
    start = "&from=" + start;
    end = "&to=" + end;
    //console.log("URL on getCandle: " + this.api_url + this.candleUrl + resolution + start + end);
    return this.http.get<assetCandle>(`${this.api_url + this.candleUrl + ticker + resolution + start + end}${this.tokens[this.getToken()]}`);
  }

  getToken():number{
    let tokenIdx = Math.floor(Math.random() * 3);
    console.log("tokenIdx: " + tokenIdx);
    return tokenIdx;
  }

}

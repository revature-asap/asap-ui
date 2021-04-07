import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { assetQuote } from '../models/assetQuote.model';
import { assetCandle } from '../models/assetCandle';
import { finnhubAssetProfile } from 'src/app/models/finnhubAssetProfile';

import {Observable} from 'rxjs';
import { newsSentiment } from '../models/newsSentiment';
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

  tokens: string[] = ["&token=c1ceppv48v6scqmqtk5g", "&token=c1cepq748v6scqmqtk8g", "&token=c1cf0gf48v6scqmqtr50"];

  api_url: string = "https://finnhub.io/api/v1";
  backend_url: string = "http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/asset?ticker=";
  lunarCrushUrl: string = "https://api.lunarcrush.com/v2?data=assets&key=x9aazwqfpgvfd08gtrd2&data_points=1&symbol=";
  quoteUrl: string = "/quote?symbol=";
  candleUrl: string = "/stock/candle?symbol=";
  profileUrl: string = "/stock/profile2?symbol=";
  sentimentUrl: string = "/news-sentiment?symbol=";
  finnhubProfileUrl: string = "/stock/profile2?symbol=";

  getQuote(ticker: string):Observable<assetQuote> {
    //console.log("in get quote with ticker: " + ticker);
    console.log("Inside get quote " + `${this.api_url + this.quoteUrl + ticker.toUpperCase() }${this.tokens[this.getToken()]}`);
    return this.http.get<assetQuote>(`${this.api_url + this.quoteUrl + ticker.toUpperCase() }${this.tokens[this.getToken()]}`);
  }

  getLunarCrushQuote(ticker: string): Observable<any> {
    console.log("finnhub service trying to get lunar crush quote");
    return this.http.get(`${this.lunarCrushUrl + ticker}`);
  }

  //should pull from backend api to display profile information for given asset with database/finnhub/lunarcrush being checked for info in order
  getProfile(ticker: string):Observable<companyProfile> {
    //console.log("in get quote with ticker: " + ticker);
    return this.http.get<companyProfile>(`${this.backend_url + ticker}`);
  }

  getCandle(ticker: string, resolution: string, start: string, end: string):Observable<assetCandle> {
    //console.log("in get candle with ticker: " + ticker);
    resolution = "&resolution=" + resolution;
    start = "&from=" + start;
    end = "&to=" + end;
    //console.log("URL on getCandle: " + this.api_url + this.candleUrl + resolution + start + end);
    return this.http.get<assetCandle>(`${this.api_url + this.candleUrl + ticker + resolution + start + end}${this.tokens[this.getToken()]}`);
  }

  getSentiment(ticker: string):Observable<newsSentiment> {
    return this.http.get<newsSentiment>(`${this.api_url + this.sentimentUrl + ticker}${this.tokens[this.getToken()]}`);
  }

  getToken():number{
    let tokenIdx = Math.floor(Math.random() * 3);
    console.log("tokenIdx: " + tokenIdx);
    return tokenIdx;
  }

  getFinnhubProfile(ticker: string):Observable<finnhubAssetProfile> {
    console.log("in get profile with ticker: " + ticker);
    console.log("URL on getProfile: " + this.api_url + this.finnhubProfileUrl + ticker + this.tokens[this.getToken()]);
    return this.http.get<finnhubAssetProfile>(`${this.api_url + this.finnhubProfileUrl + ticker}${this.tokens[this.getToken()]}`);
  }
}

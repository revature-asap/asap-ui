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

/**
 * Service used to directly communicate with the Finnhub API and also the LunarCrush where we can pass specific params to 
 * get the data we're looking for.
 */
@Injectable({
  providedIn: 'root'
})
export class FinnhubService {

  constructor(private http: HttpClient) { }

  //finnhub tokens that we can rotate through because there is a limit of 60 calls to the api per minute
  tokens: string[] = ["&token=c1ceppv48v6scqmqtk5g", "&token=c1cepq748v6scqmqtk8g", "&token=c1cf0gf48v6scqmqtr50"];

  //finnhub url
  api_url: string = "https://finnhub.io/api/v1";
  //backend url
  backend_url: string = "http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/asset?ticker=";
  //lunar crush url
  lunarCrushUrl: string = "https://api.lunarcrush.com/v2?data=assets&key=x9aazwqfpgvfd08gtrd2&data_points=1&symbol=";
  
  //These are all the params passed in the APIs
  quoteUrl: string = "/quote?symbol=";
  candleUrl: string = "/stock/candle?symbol=";
  profileUrl: string = "/stock/profile2?symbol=";
  sentimentUrl: string = "/news-sentiment?symbol=";
  finnhubProfileUrl: string = "/stock/profile2?symbol=";

  /**
   * Gets a qoute from a the Finnhub API by their ticker name
   * @param ticker ticker of an asset
   * @returns returns a qoute for that asset
   */
  getQuote(ticker: string):Observable<assetQuote> {

    return this.http.get<assetQuote>(`${this.api_url + this.quoteUrl + ticker.toUpperCase() }${this.tokens[this.getToken()]}`);
  }

  /**
   * Used to get a qoute from the Lunar API
   * @param ticker ticker of an asset
   * @returns returns a qoute
   */
  getLunarCrushQuote(ticker: string): Observable<any> {

    return this.http.get(`${this.lunarCrushUrl + ticker}`);
  }

  //should pull from backend api to display profile information for given asset with database/finnhub/lunarcrush being checked for info in order
  getProfile(ticker: string):Observable<companyProfile> {

    return this.http.get<companyProfile>(`${this.backend_url + ticker}`);
  }

  /**
   * returns an asset candle
   * @param ticker asset ticker
   * @param resolution resolution (time frame. 1min, 5min, 30min, 1day, 1month.....)
   * @param start starting epoch time
   * @param end ending epoch time
   * @returns  returns a candle
   */
  getCandle(ticker: string, resolution: string, start: string, end: string):Observable<assetCandle> {

    resolution = "&resolution=" + resolution;
    start = "&from=" + start;
    end = "&to=" + end;

    return this.http.get<assetCandle>(`${this.api_url + this.candleUrl + ticker + resolution + start + end}${this.tokens[this.getToken()]}`);
  }

  /**
   * Finnhub has a sentiment analysis on their news and this method gets the bullish and bearish 
   * @param ticker asset ticker
   * @returns returns a sentiment analysis for a ticker
   */
  getSentiment(ticker: string):Observable<newsSentiment> {

    return this.http.get<newsSentiment>(`${this.api_url + this.sentimentUrl + ticker}${this.tokens[this.getToken()]}`);
  }

  /**
   * helper method to get a random index in our token array
   * @returns returns a random index token 
   */
  getToken():number{

    let tokenIdx = Math.floor(Math.random() * 3);
    return tokenIdx;
  }

  /**
   * Method used to get an asset profile from the Finnhub API
   * @param ticker asset ticker
   * @returns returns an asset profile
   */
  getFinnhubProfile(ticker: string):Observable<finnhubAssetProfile> {

    return this.http.get<finnhubAssetProfile>(`${this.api_url + this.finnhubProfileUrl + ticker}${this.tokens[this.getToken()]}`);
  }
}

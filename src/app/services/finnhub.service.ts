import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '../models/asset';
import { Candle } from '../models/candle';

import {Observable} from 'rxjs';
import { Time } from '@angular/common';

const httpOptions = {                                             
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class FinnhubService {
  
  constructor(private http: HttpClient) { }

  api_url: string = "https://finnhub.io/api/v1/quote?symbol=AAPL?resolution=D?from=&token=c1cepq748v6scqmqtk8g";
  quoteUrl: string = "https://finnhub.io/api/v1/quote?symbol=";
  candleUrl: string = "https://finnhub.io/api/v1/stock/candle?symbol=";
  tokenUrl: string = "&token=c1cepq748v6scqmqtk8g";
  
  getQuote(ticker: string):Observable<Asset> {
    console.log("in get quote with ticker: " + ticker);
    return this.http.get<Asset>(`${this.quoteUrl + ticker + this.tokenUrl}`);
  }

  getCandle(ticker: string, resolution: string, start: string, end: string):Observable<Candle[]> {
    console.log("in get candle with ticker: " + ticker);
    resolution = "&resolution=" + resolution;
    start = "&from=" + start;
    end = "&to=" + end;
    console.log("URL on getCandle: " + this.candleUrl + ticker + resolution + start + end + this.tokenUrl);
    return this.http.get<Candle[]>(`${this.candleUrl + ticker + resolution + start + end + this.tokenUrl}`);
  }


}

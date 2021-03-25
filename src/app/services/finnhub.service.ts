import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Asset } from '../models/asset';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {

  constructor(private http: HttpClient) { }

  api_url: string = "https://finnhub.io/api/v1/quote?symbol=AAPL&token=c1cepq748v6scqmqtk8g";

  // getQuote(ticker: string): Promise<Asset> {
  //   console.log('getting quote', ticker);
  //   return this.http.get<Asset[]>(api_url, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     observe: 'response'
  //   }).pipe(
  //     map(resp => {
  //       let principal = resp.body as Principal;
  //       this.currentUserSubject.next(principal);
  //       return principal;
  //     })
  //   ).toPromise();
  // }
  getQuote(ticker: string):Observable<Asset> {
    return this.http.get<Asset>(`${this.api_url}`);
  }


}

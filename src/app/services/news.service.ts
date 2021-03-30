import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import {map} from "rxjs/operators";
import {Article} from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsURL = 'https://finnhub.io/api/v1/company-news?';
  constructor(private httpClient: HttpClient) { }

  stockNews(stockSymbol: string, dateFrom: string, dateTo: string): Promise<any>{
    let symbol = 'symbol=' + stockSymbol;
    let from = '&from=' + dateFrom;
    let to = '&to=' + dateTo;
    const token = '&token=c1hlcvn48v6q1s3o3v10';

    return this.httpClient.get(this.newsURL+symbol+from+to+token, {
      observe: 'response'
    }).pipe(
      map(resp => {
        return resp.body;
    })
    ).toPromise();
  }
}

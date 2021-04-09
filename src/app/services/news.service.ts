import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

/**
 * Service leveraged by the NewsComponent for making calls to
 * the FinnHub API to receive the latest news article for a
 * given stock symbol
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsURL = 'https://finnhub.io/api/v1/company-news?';
  constructor(private httpClient: HttpClient) { }

  /**
   * Makes a call to the FinnHub API for getting news articles from
   * the past week for a given stock symbol
   * @param stockSymbol the symbol of the stock
   * @param dateFrom the date from a week ago in format yyyy-mm-dd
   * @param dateTo the current date in format yyyy-mm-dd
   */
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

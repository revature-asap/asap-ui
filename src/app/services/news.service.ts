import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import {map} from "rxjs/operators";
import {Article} from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsURL = 'https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=finance&lang=en&country=us';

  constructor(private httpClient: HttpClient) { }

  stockNews(): Promise<any>{
    return this.httpClient.get(this.newsURL, {
      headers: {
        'x-rapidapi-key': '59112df39fmshdec38ef5443177cp1a45bdjsnac5d805063d7'
      },
      observe: 'response'
    }).pipe(
      map(resp => {
        //@ts-ignore
        let body = resp.body.articles;
        console.log(body);
        return body;
    })
    ).toPromise();
  }
}

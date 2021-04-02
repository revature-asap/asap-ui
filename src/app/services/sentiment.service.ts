import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Time } from '@angular/common';
import { sentimentCarrier } from '../models/sentimentCarrier';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor(private http: HttpClient) { }

  twitterUrl: string = "http://localhost:5000/twitter?asset=";
  redditUrl: string = "http://localhost:5000/reddit?asset=";

  updateTwitterSentiment(asset: string):Observable<sentimentCarrier> {
      console.log("In update sentiment with asset: " + asset);
      return this.http.get<sentimentCarrier>(`${this.twitterUrl}${asset}`);
  }

  updateRedditSentiment(asset: string):Observable<sentimentCarrier> {
    console.log("In update sentiment with asset: " + asset);
    return this.http.get<sentimentCarrier>(`${this.redditUrl}${asset}`);
}
}
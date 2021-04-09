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

/**
 * Service related to hitting Twitter and Reddit endpoints to pull information
 * related to the sentiment score of a provided Asset-Ticker.
 */
@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  constructor(private http: HttpClient) { }

  twitterUrl: string = "http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/twitter?asset=";
  redditUrl: string = "http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/reddit?asset=";

  /**
   * Sends asset to be analyzed by comprehend based on Twitter posts.
   * @param asset Asset ticker to be searched
   * @returns Sentiment carrying object
   */
  updateTwitterSentiment(asset: string):Observable<sentimentCarrier> {
      console.log("In update sentiment with asset: " + `${this.twitterUrl}${asset}`);
      return this.http.get<sentimentCarrier>(`${this.twitterUrl}${asset}`);
  }

  /**
   * Sends asset to be analyzed by comprehend based on Reddit posts.
   * @param asset Asset ticker to be searched
   * @returns Sentiment carrying object
   */
  updateRedditSentiment(asset: string):Observable<sentimentCarrier> {
    console.log("In update sentiment with asset: " + asset);
    return this.http.get<sentimentCarrier>(`${this.redditUrl}${asset}`);
}
}

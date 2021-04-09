import {Component, Input, OnInit} from '@angular/core';
import { newsSentiment } from 'src/app/models/newsSentiment';
import { sentimentCarrier } from 'src/app/models/sentimentCarrier';
import { FinnhubService } from 'src/app/services/finnhub.service';
import { SentimentService } from 'src/app/services/sentiment.service';
import { ActivatedRoute } from '@angular/router';

/**
 * Component used to pull and set sentiment values to different media feeds.
 * Will set Twitter, Reddit, and News based on AWS Comprehend, and Finhubb API.
 */
@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  twitterSentiment!: number;
  redditSentiment!: number;
  newsSentiment!: number;
  loading = true;
  @Input() assetTicker!: string;

  constructor(private sentiment: SentimentService, private finnhub: FinnhubService,private _Activatedroute:ActivatedRoute) {
   }

   /**
    * Compares positive and negative sentiment values to set which display appears.
    * @param pos Positive sentiment value
    * @param neg Negative sentiment value
    * @returns Index associated with Up arrow, Down arrow, Neutral.
    */
   sentimentCompare(pos: number, neg: number): number{
      if(pos>neg){
        return 1;
      }
      else if(pos==neg){
        return 0;
      }
      else{
        return -1;
      }
   }

   /**
    * Takes ticker from the active route, and uses it to make calls to:
    * Twitter backend Endpoint (requires ticker for search and analysis)
    * Reddit backend Endpoint (also requires ticker)
    * Finnhub api (You guessed it! Also requires the ticker)
    * Timeout below allows each call to process while a loading bar exists.
    */
  ngOnInit(): void {
    if(this.assetTicker == null) {
      this.assetTicker = this._Activatedroute.snapshot.paramMap.get("tickerId") || '{}';
    }
    console.log("ticker is: " + this.assetTicker);
    this.loading = true;
    this.sentiment.updateTwitterSentiment(this.assetTicker).subscribe((response:sentimentCarrier) =>
    {
      this.twitterSentiment = this.sentimentCompare(response.sentimentTotals.POSITIVE, response.sentimentTotals.NEGATIVE );
    });
    this.sentiment.updateRedditSentiment(this.assetTicker).subscribe((response:sentimentCarrier) =>
    {
      this.redditSentiment = this.sentimentCompare(response.sentimentTotals.POSITIVE, response.sentimentTotals.NEGATIVE );
    });
    this.finnhub.getSentiment(this.assetTicker).subscribe((response:newsSentiment) =>
    {
      this.newsSentiment = this.sentimentCompare(response.sentiment.bullishPercent, response.sentiment.bearishPercent);
    });
    setTimeout(() => {
    this.loading = false;
    }, 5000);
  }

}

import { Component, OnInit } from '@angular/core';
import { newsSentiment } from 'src/app/models/newsSentiment';
import { sentimentCarrier } from 'src/app/models/sentimentCarrier';
import { FinnhubService } from 'src/app/services/finnhub.service';
import { SentimentService } from 'src/app/services/sentiment.service';

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
  assetTicker!: string;

  constructor(private sentiment: SentimentService, private finnhub: FinnhubService) {
      //Import asset service in some way
   }

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

  ngOnInit(): void {
    this.loading = true;
    this.sentiment.updateTwitterSentiment(this.assetTicker).subscribe((response:sentimentCarrier) =>
    {
      console.log("This is the response object from the Twitter http call: " + JSON.stringify(response));
      this.twitterSentiment = this.sentimentCompare(response.sentimentTotals.POSITIVE, response.sentimentTotals.NEGATIVE );
    });
    this.sentiment.updateRedditSentiment(this.assetTicker).subscribe((response:sentimentCarrier) =>
    {
      console.log("This is the response object from the Reddit http call: " + JSON.stringify(response));
      this.redditSentiment = this.sentimentCompare(response.sentimentTotals.POSITIVE, response.sentimentTotals.NEGATIVE );
    });
    this.finnhub.getSentiment(this.assetTicker).subscribe((response:newsSentiment) =>
    {
      console.log("This is the response object from the NEWS http call: " + JSON.stringify(response));
      this.newsSentiment = this.sentimentCompare(response.sentiment.bullishPercent, response.sentiment.bearishPercent);
    });
    
    setTimeout(() => {
    this.loading = false;
    }, 5000);
  }

}

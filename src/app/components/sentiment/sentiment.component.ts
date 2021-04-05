import { Component, OnInit } from '@angular/core';
import { sentimentCarrier } from 'src/app/models/sentimentCarrier';
import { SentimentService } from 'src/app/services/sentiment.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  twitterSentiment!: number;
  redditSentiment!: number;
  loading = true;

  constructor(private sentiment: SentimentService) {

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
    this.sentiment.updateTwitterSentiment("Game Stop").subscribe((response:sentimentCarrier) =>
    {
      console.log("This is the response object from the Twitter http call: " + JSON.stringify(response));
      this.twitterSentiment = this.sentimentCompare(response.sentimentTotals.POSITIVE, response.sentimentTotals.NEGATIVE );
    });
    this.sentiment.updateRedditSentiment("Microsoft").subscribe((response:sentimentCarrier) =>
    {
      console.log("This is the response object from the Reddit http call: " + JSON.stringify(response));
      this.redditSentiment = this.sentimentCompare(response.sentimentTotals.POSITIVE, response.sentimentTotals.NEGATIVE );
    });
    setTimeout(() => {
    this.loading = false;
    }, 5000);
  }

}

import { Component, OnInit } from '@angular/core';
import { sentimentCarrier } from 'src/app/models/sentimentCarrier';
import { SentimentService } from 'src/app/services/sentiment.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {

  sentimentObj!: sentimentCarrier;

  twitterSentiment!: number;




  constructor(private sentiment: SentimentService) {

   }

   sentimentCompare(pos: number, neg: number): number{
      if(pos>neg){
        return pos;
      }
      else if(pos==neg){
        return 0;
      }
      else{
        return -neg;
      }
   }

  //  updateSentiment(){
  //     this.sentiment.updateTwitterSentiment("Apple"));
  //  }

  ngOnInit(): void {
    this.sentiment.updateTwitterSentiment("Game Stop").subscribe((response:sentimentCarrier) =>
    {
      console.log("This is the response object from the http call: " + JSON.stringify(response));
      this.sentimentObj = response;
      console.log("This is the sentiment object that should be mapped from the response object: " + JSON.stringify(this.sentimentObj));
      console.log("Object.Totals: " + JSON.stringify(this.sentimentObj.sentimentAverage.POSITIVE));
      this.twitterSentiment = this.sentimentCompare(this.sentimentObj.sentimentTotals.POSITIVE,this.sentimentObj.sentimentTotals.NEGATIVE );
    })


  }

}

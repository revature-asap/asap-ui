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

  posTotalTwit!: number

  constructor(private sentiment: SentimentService) {
      this.sentiment.updateTwitterSentiment("Apple").subscribe((response:sentimentCarrier) =>
        {
          console.log("This is the response object from the http call: " + JSON.stringify(response));
          this.sentimentObj = response;
          console.log("This is the sentiment object that should be mapped from the response object: " + JSON.stringify(this.sentimentObj));
          console.log("Object.Totals: " + JSON.stringify(this.sentimentObj.sentimentAverage.POSITIVE));
          
        })
   }

  //  updateSentiment(){
  //     this.sentiment.updateTwitterSentiment("Apple"));
  //  }

  ngOnInit(): void {
  }

}

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

  constructor(private sentiment: SentimentService) {
      this.sentiment.updateTwitterSentiment("Apple").subscribe(response =>
        {
          this.sentimentObj = response;
        })
   }

  //  updateSentiment(){
  //     this.sentiment.updateTwitterSentiment("Apple"));
  //  }

  ngOnInit(): void {
  }

}

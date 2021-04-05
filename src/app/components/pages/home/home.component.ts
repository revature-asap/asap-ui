import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  comments!: string;
  count!: number;

  constructor() { }

  ngOnInit(): void {
    this.count = 0;
  }

  receiveComment($event: string){
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  receiveCount($event: string){
    this.comments = $event;
    this.count = this.comments.length
  }

}

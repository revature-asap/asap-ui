import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tile } from 'src/app/models/Tile';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  comments!: string;
  count!: number;


  loggedIn!:boolean;
  tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'}
  ];
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.currentUser$.subscribe(
      user => {
        if (user != null) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      })
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

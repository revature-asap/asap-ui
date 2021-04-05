import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/models/principal';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {


  subscription: Subscription | undefined;

  userProfile = {};

  user!: Principal;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.subscription = this.route.data.subscribe(
      (data: Data) =>{
        this.user = data['profile'];
        this.userProfile = {
          'background' : 'url(https://source.unsplash.com/random/200x200)',
          'background-repeat' : 'no-repeat',
          'background-size' : 'cover'
        };
      }
    )




    // this.userProfile = {
    //   'background' : 'url(https://source.unsplash.com/random/200x200)',
    //   'background-repeat' : 'no-repeat',
    //   'background-size' : 'cover'
    // }; // this.BackgroundImage


  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  }


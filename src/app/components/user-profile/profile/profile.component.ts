import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/models/principal';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  // Variables
  subscription: Subscription | undefined; // subscription for route in profile resolver
  userProfile = {}; // Used to set background image dynamically
  user!: Principal; // Set data about user in Principal object

  // Angular's version of dependency injection by including an access modifier, parameter name, and parameter type
  constructor(private route: ActivatedRoute) {}

  // Code to run when component is created
  ngOnInit(): void {
    // Click watchlist button to go to watchlist route on profile 
    let watchlistButton = document.getElementById("watchlistButton");
    watchlistButton?.click();
    // subscribe to route in profile resolver to get data before component fully loads
    this.subscription = this.route.data.subscribe(
      (data: Data) =>{
        // set user from resolve
        this.user = data['profile'];
        // Set background image and use userProfile as a ngStyle in HTML
        this.userProfile = {
          'background' : 'url(https://source.unsplash.com/random/200x200)',
          'background-repeat' : 'no-repeat',
          'background-size' : 'cover'
        };
      }
    );
  } // ngOnInit()
  
  // Unsubscribe when component is destroyed
  ngOnDestroy(){
    this.subscription?.unsubscribe();
  } // ngOnDestroy()
} // class ProfileComponent 


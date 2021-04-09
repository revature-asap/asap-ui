import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/models/principal';
import { LoginService } from 'src/app/services/login.service';
import { LogoutService } from 'src/app/services/logout.service';
import {BreakpointObserver} from '@angular/cdk/layout'; // Needed to detect a screen size change
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // Variables
  mobileNavigation!: boolean; // Used for ngIf to determine which components are being shown, whether they are in mobile view or desktop view
  @ViewChild('drawer') public drawer!: MatDrawer // Used to open and close the drawer by toggling it
  logSubscription!: Subscription; // Subscription for currentUser$ 
  screenSubscription!: Subscription; // Subscription for breakpointObserver
  currentUser?: Principal; // Holds currentUser$ data or is null/undefined
  searchInput!: string; // Text inside of search bar
  publicRoutes = // Array for public routes that users can see without being logged in
  [ 
    {
      routeName: 'Dashboard',
      routeLink: '/home',
      routeSymbol: 'home'
    },
    {
      routeName: 'Login',
      routeLink: '/login',
      routeSymbol: 'login'
    }
  ];
  privateRoutes = // Array of routes that user can see if they are logged in
  [
    {
      routeName: 'Dashboard',
      routeLink: '/home',
      routeSymbol: 'home'
    },
    {
      routeName: 'User Profile',
      routeLink: '/profile',
      routeSymbol: 'person'
    },
    {
      routeName: 'Logout',
      routeLink: '/home',
      routeSymbol: 'logout'
    }
  ];

  // Angular's version of dependency injection by including an access modifier, parameter name, and parameter type
  constructor(public loginService: LoginService, public logoutService: LogoutService, private route: Router, private breakPointObserver: BreakpointObserver) { }

  // Code to run when component is created
  ngOnInit(): void {

    // Checks screen size by using breakPointObserver
    // If the screen is at least 65 rem, mobile navigation is false. Else, mobile navigation is true
    // Needed to change the boolean mobileNavigation
    this.screenSubscription = this.breakPointObserver.observe('(min-width: 65rem)').subscribe(screenState => {
      if (screenState.matches)
      {
        this.mobileNavigation = false;
      } // if
      else {
        this.mobileNavigation = true;
      } // else
    });

    this.logSubscription = this.loginService.currentUser$.subscribe(
      user=> {
        this.currentUser = user as Principal;
      });
  } // ngOnInit()

  // Calls logoutUser from logoutService and navigates back to login page
  logout() {
    this.logoutService.logoutUser();
    this.route.navigate(['login']);
  } // logout()

  // Open and closes mat-drawer
  toggleDrawer(){
    this.drawer.toggle();
  } // toggleDrawer()

  // Unsubscribe when component is destroyed
  ngOnDestroy(){
    this.logSubscription.unsubscribe();
    this.screenSubscription.unsubscribe();
  } // ngOnDestroy()

  onSubmit(form: NgForm){
    if(!form.value.searchField){
    } // if
    else{
     this.route.navigate(['companyDisplay' + '/'+form.value.searchField]);
     this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    } // else
  } // onSubmit(form: NgForm)
} // class NavbarComponent

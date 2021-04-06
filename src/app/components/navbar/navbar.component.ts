import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/models/principal';
import { User } from 'src/app/models/user';
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
  mobileNavigation!: boolean;

  @ViewChild('drawer') public drawer!: MatDrawer

  logSubscription!: Subscription;
  screenSubscription!: Subscription;


  currentUser?: Principal;

  publicRoutes = [

    {
      routeName: 'Dashboard',
      routeLink: '/home',
      routeSymbol: 'home'
    },
    {
      routeName: 'Assets',
      routeLink: '/asset',
      routeSymbol: 'login'
    },

    {
      routeName: 'Login',
      routeLink: '/login',
      routeSymbol: 'login'
    }

  ];

  privateRoutes = [
    {
      routeName: 'Dashboard',
      routeLink: '/home',
      routeSymbol: 'home'
    },

    {
      routeName: 'Assets',
      routeLink: '/companyDisplay',
      routeSymbol: 'login'
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

  ]

  constructor(public loginService: LoginService, public logoutService: LogoutService, private route: Router, private breakPointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.screenSubscription = this.breakPointObserver.observe('(min-width: 65rem)').subscribe(screenState => {
      if (screenState.matches)
      {
        this.mobileNavigation = false;
      }
      else {
        this.mobileNavigation = true;
      }
    });

    this.logSubscription = this.loginService.currentUser$.subscribe(
      user=> {
        this.currentUser = user as Principal;
      });
  }

  logout() {

    this.logoutService.logoutUser();
    this.route.navigate(['login']);
  }

  toggleDrawer(){

    this.drawer.toggle();

  }

  ngOnDestroy(){
    this.logSubscription.unsubscribe();
    this.screenSubscription.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/models/principal';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logSubscription!: Subscription;


  currentUser?: Principal;

  publicRoutes = [

    {
      routeName: 'Dashboard',
      routeLink: '/dashboard',
      routeSymbol: 'home'
    },

    {
      routeName: 'Login',
      routeLink: '/login',
      routeSymbol: 'login'
    },

  ];

  privateRoutes = [
    {
      routeName: 'Dashboard',
      routeLink: '/dashboard',
      routeSymbol: 'home'
    },
    {
      routeName: 'User Profile',
      routeLink: '/profile',
      routeSymbol: 'person'
    },
    {
      routeName: 'Logout',
      routeLink: '/dashboard',
      routeSymbol: 'logout'
    }

  ]

  constructor(public loginSerice: LoginService) { }

  ngOnInit(): void {

    this.logSubscription = this.loginSerice.currentUser$.subscribe(
      user=> {
        this.currentUser = user as Principal;
      });
  }

  logout() {

    this.currentUser = undefined;
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  currentUser = "anything"

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

  constructor() { }

  ngOnInit(): void {
    this.currentUser = "Anything";
  }

  logout() {
    this.currentUser = '';
  }

}

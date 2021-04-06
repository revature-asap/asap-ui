import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Principal } from 'src/app/models/principal';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logSubscription!: Subscription;


  currentUser?: Principal;

  searchInput!: string;

  publicRoutes = [

    {
      routeName: 'Dashboard',
      routeLink: '/home',
      routeSymbol: 'home'
    },

    // {
    //   routeName: 'Assets',
    //   routeLink: '/companyDisplay',
    //   routeSymbol: 'login'
    // },

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

    // {
    //   routeName: 'Assets',
    //   routeLink: '/companyDisplay',
    //   routeSymbol: 'login'
    // },

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

  constructor(public loginService: LoginService, public logoutService: LogoutService, private route: Router) { }

  ngOnInit(): void {

    this.logSubscription = this.loginService.currentUser$.subscribe(
      user=> {

        console.log("Something changed. I got a user", user);
        this.currentUser = user as Principal;
      });

    

  }

  logout() {

    this.logoutService.logoutUser();
    this.route.navigate(['login']);

  }

  // onSubmit(form: NgForm){
  //   console.log(form.value.searchField);


  // }

  onSubmit(form: NgForm){
    
    if(!form.value.searchField){
    }
    else{
     this.route.navigate(['companyDisplay' + '/'+form.value.searchField]);
     this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    }
    
  }

}

import { Component, OnInit} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Variables
  loggedIn!:boolean; // Boolean used to for *ngIf to determine which tags show in HTML
    // Angular's version of dependency injection by including an access modifier, parameter name, and parameter type
  constructor(private loginService: LoginService) { }
  // Code to run when component is created
  ngOnInit(): void {
    // Subscribe to currentUser$ and check if a user exists or is null. If they exist,
    // loggedIn is true, else loggedIn is false
    this.loginService.currentUser$.subscribe(
      user => {
        if (user != null) {
          this.loggedIn = true;
        } // if 
        else {
          this.loggedIn = false;
        }// else
      });
  } // ngOnInit()
} // class HomeComponent

import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.css']
})
export class CommentsContainerComponent implements OnInit {

  loggedIn!: boolean;

  constructor(private loginService: LoginService) { }

  /**
   * checks if the user is logged in or not.
   */
  ngOnInit(): void {
    this.loginService.currentUser$.subscribe(
      u => {
        if (u != null) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      });
  }

}

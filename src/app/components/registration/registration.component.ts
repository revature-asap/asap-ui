import { Component, OnInit } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser: User = {
    id: 0,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    role: ''
  }

  errorMessage = '';

  constructor() { }

  ngOnInit(): void {
    
  }

  register() {
    if (!this.newUser.username || !this.newUser.password || !this.newUser.firstname ||
      !this.newUser.lastname || !this.newUser.email)  {
      this.errorMessage = 'All fields must be filled out';
      return;
    }

    this.errorMessage = '';
  }

}

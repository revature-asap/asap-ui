import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser: User = {
    // id: 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
    // role: ''
  }

  errorMessage = '';

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    
  }

  register() {
    if (!this.newUser.username || !this.newUser.password || !this.newUser.firstName ||
      !this.newUser.lastName || !this.newUser.email)  {
      this.errorMessage = 'All fields must be filled out';
      return;
    }
    
    this.registrationService.register(this.newUser)
                            .subscribe(user => {
                              console.log("you will recive the email shortly " + user);
                            });
    console.log("registration component");
    this.errorMessage = '';
  }

}

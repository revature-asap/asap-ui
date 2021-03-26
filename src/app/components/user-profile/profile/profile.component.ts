import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile = {};

  user?: User;

  constructor() {
    this.user = {    id: 1,
      username: "waefwaef",
      password: "awefwaef",
      firstname: "awefwaef",
      lastname: "stgresgring",
      email: "strisergng",
      role: "strersging"}
   }

  ngOnInit(): void {
    this.userProfile = {
      'background' : 'url(https://source.unsplash.com/random/200x200)',
      'background-repeat' : 'no-repeat',
      'background-size' : 'cover'
    }; // this.BackgroundImage


  }

  }


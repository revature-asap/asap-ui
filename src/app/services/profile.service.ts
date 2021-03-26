import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

//   this.user = {    id: 1,
//     username: "waefwaef",
//     password: "awefwaef",
//     firstname: "awefwaef",
//     lastname: "stgresgring",
//     email: "strisergng",
//     role: "strersging"}
//  }

profileInfoChanged = new Subject<User>();

  private profileInfo: User = {
    id: 1,
    username: "waefwaef",
    password: "awefwaef",
    firstname: "awefwaef",
    lastname: "stgresgring",
    email: "strisergng",
    role: "strersging"};



  getProfile() {

    return this.profileInfo;

  }

  setAbout(profileInfo: User){

    this.profileInfo = profileInfo;

    this.profileInfoChanged.next(this.profileInfo);

  }
}

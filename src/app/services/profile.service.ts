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


private profileInfo2: User = new User(1, 'username1', 'pass', 'firstmn', 'lastn', 'ema', 'arole');



  private profileInfo: User = {
    id: 1,
    username: "waefwaef",
    password: "awefwaef",
    firstname: "awefwaef",
    lastname: "stgresgring",
    email: "strisergng",
    role: "strersging"};



  getProfile() {


    //console.log(this.profileInfo);
    return this.profileInfo2;

  }

  setAbout(profileInfo: User){

    this.profileInfo = profileInfo;

    this.profileInfoChanged.next(this.profileInfo);

  }
}

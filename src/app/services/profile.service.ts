import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

profileInfoChanged = new Subject<User>();


  private profileInfo: User = {
    username: "waefwaef",
    password: "awefwaef",
    firstName: "awefwaef",
    lastName: "stgresgring",
    email: "strisergng"};



  getProfile() {


    //console.log(this.profileInfo);
    return this.profileInfo;

  }

  setAbout(profileInfo: User){

    this.profileInfo = profileInfo;

    this.profileInfoChanged.next(this.profileInfo);

  }
}

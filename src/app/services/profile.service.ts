import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Principal } from '../models/principal';
import { User } from '../models/user';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public loginService: LoginService) {}

profileInfoChanged = new Subject<Principal|null>();


  private profileInfo!: Principal | null;



  getProfile() {

    if (this.profileInfo == null) {
     this.loginService.currentUser$.subscribe(
       user => {
         this.profileInfo = user;
         this.profileInfoChanged.next(this.profileInfo);
       }
     );
    }
    return this.profileInfo;

  }

  // setProfile(profileInfo: User){

  //   this.profileInfo = profileInfo;

  //   this.profileInfoChanged.next(this.profileInfo);

  // }
}

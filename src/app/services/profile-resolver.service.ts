import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router' // Needed so that you can load and resolve the data for this route to it fully opening
import {User} from '../models/user';
import {ProfileService} from './profile.service';
@Injectable({ // Needed so that you don't have to include this service in the providers array in app.modules.ts
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<User> {

  constructor(private profileService: ProfileService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ // The resolve method preloads data before the component is loaded

    const profileInfo = this.profileService.getProfile(); // Grabs the current instance of User
    console.log('The profile info is ');
    console.log(profileInfo);
    // If the current instance of User is null, fetch data from the backend. Else, return the current instance of User
    return profileInfo;
    // if (profileInfo == null) {
    //   //return this.profileService.fetchProfile();
    // } // if
    // else {
    //   return profileInfo;
    // }
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private login: LoginService) { }

  logoutUser(): void {

    this.login.setToken(null);
    this.login.setCurrentUserSubjectToNull(); 
  }

}

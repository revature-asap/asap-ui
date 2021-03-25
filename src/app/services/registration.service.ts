import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../components/registration/models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  registerURL = '/register';
  constructor(private http: HttpClient) { }

  // post method
  registerAccount(user:User): Observable<User>{
    return this.http.post<User>(this.registerURL,user);
  }

}

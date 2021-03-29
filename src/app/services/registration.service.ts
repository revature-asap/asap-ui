import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  // I think this is what it'll look like
  registerURL = 'http://asap.us-east-2.elasticbeanstalk.com/users';
  // registerURL = '/users';
  constructor(private http: HttpClient) { }

  // post method
  registerAccount(user:User): Observable<User>{
    return this.http.post<User>(this.registerURL,user);
  }

}

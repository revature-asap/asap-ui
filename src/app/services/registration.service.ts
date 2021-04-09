import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
/**
 * registration service that is just for adding a post method to our register endpoint on the backend
 */
export class RegistrationService {
  registerURL = 'http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/users';
  // registerURL = '/users';
  constructor(private http: HttpClient) { }

  /**
   *  Post Method to connect to backend
   * @param user the user that is to be registered by taking the input from fields that someone has filled out
   * @returns an observable that can be subscribed to of type User
   */
  register(user:User): Observable<User>{
    console.log("registration service");

    return this.http.post<User>(this.registerURL,user);
  }

}

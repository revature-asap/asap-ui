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
  // registerURL = 'http://localhost:5000/users';
  registerURL = 'http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/users';
  // registerURL = '/users';
  constructor(private http: HttpClient) { }

  // post method
  register(user:User): Observable<User>{
    console.log("registration service");

    return this.http.post<User>(this.registerURL,user);
  }

}

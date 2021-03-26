import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = 'http://localhost:5000/users/login';
  token: string | null | undefined;

  constructor(private httpClient: HttpClient) { }

  authenticate(un: string, pw: string): Promise<any> {
    return this.httpClient.post(this.loginUrl, {un, pw}, {
      headers: {
        'Content-Type': 'application/json'
      },
      observe: 'response'
    }).pipe(
      map(resp => {
        const token = resp.headers.get('ASAP-token');
        this.setToken(token);
        return this.token;
      })
    ).toPromise();
  }

  setToken(token: string | null | undefined): void {
    this.token = token;
  }

  get grabToken(): string | null | undefined {
    return this.token;
  }
}

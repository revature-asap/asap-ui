import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Principal} from "../models/principal";
import {BehaviorSubject, Observable} from "rxjs";
import {Credentials} from "../models/credentials";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<Principal | null>;
  currentUser$: Observable<Principal | null>;
  loginUrl = 'http://localhost:5000/users/login';
  token: string | null | undefined;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Principal | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  authenticate(un: string, pw: string): Promise<any> {
    let creds = new Credentials(un, pw);
    return this.httpClient.post(this.loginUrl, creds, {
      headers: {
        'Content-Type': 'application/json'
      },
      observe: 'response'
    }).pipe(
      map(resp => {
        const token = resp.headers.get('ASAP-token');
        this.setToken(token);
        const principal = resp.body as Principal;
        this.currentUserSubject.next(principal);
        return principal;
      })
    ).toPromise();
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  setToken(token: string | null | undefined): void {
    this.token = token;
  }

  get grabToken(): string | null | undefined {
    return this.token;
  }
}

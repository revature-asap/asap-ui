import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import {map} from "rxjs/operators";
import {Principal} from "../models/principal";
// @ts-ignore
import {BehaviorSubject, Observable} from "rxjs";
import {Credentials} from "../models/credentials";

/**
 * Service class for the Login Component, this class will
 * take in user input from the login component and try
 * to verify that the credentials supplied are correct by
 * calling the endpoint for our application
 */
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<Principal | null>;
  currentUser$: Observable<Principal | null>;
  loginUrl = 'http://ec2co-ecsel-1g0q6xc63i5af-1652680293.us-east-2.elb.amazonaws.com:5000/users/login';
  // loginUrl = 'http://localhost:5000/users/login';
  token: string | null | undefined;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Principal | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * Authenticates the information passed by the user from the login
   * component, takes in a username and password that is sent in a
   * post request to the application.
   * @param un the username of the user
   * @param pw the password of the user
   */
  authenticate(un: string, pw: string): Promise<any> {
    let creds = new Credentials(un, pw);
    // @ts-ignore
    return this.httpClient.post(this.loginUrl, creds, {
      headers: {
        'Content-Type': 'application/json'
      },
      observe: 'response'
    }).pipe(
      // @ts-ignore
      map(resp => {
        const token = resp.headers.get('ASAP-token');
        this.setToken(token);
        const principal = resp.body as Principal;
        this.currentUserSubject.next(principal);
        return principal;
      })
    ).toPromise();
  }

  /**
   * This gets the current user that is logged in for this
   * client side
   */
  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  setCurrentUserSubjectToNull() {
    this.currentUserSubject.next(null);
  }

  /**
   * This sets the token that is sent back from the server for the
   * user session
   * @param token the token string for the user session
   */
  setToken(token: string | null | undefined): void {
    this.token = token;
  }

  /**
   * This method grabs the token for the user currently logged in
   */
  get grabToken(): string | null | undefined {
    return this.token;
  }
}

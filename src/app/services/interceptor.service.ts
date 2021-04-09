import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

/**
 * This service injects the token received by our api into the
 * headers of all requests from this browser
 */
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token: string | null | undefined;
  constructor(private loginService: LoginService) { }

  /**
   * Overriding the intercept method to grab the http request from the
   * user and to append the asap-token into the request if it exists
   * @param req the http request
   * @param next the http handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.loginService.grabToken;
    if(this.token && !(req.url.includes('finnhub.io') || req.url.includes('lunarcrush.com'))){
      let newHeaders = req.headers;
      newHeaders = newHeaders.append('ASAP-token', this.token as string);
      const authReq = req.clone({headers: newHeaders});
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}

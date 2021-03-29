import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
// @ts-ignore
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token: string | null | undefined;
  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.loginService.grabToken;
    if(this.token){
      let newHeaders = req.headers;
      newHeaders = newHeaders.append('ASAP-token', this.token as string);
      const authReq = req.clone({headers: newHeaders});
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}

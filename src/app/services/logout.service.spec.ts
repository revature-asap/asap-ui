import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { stringify } from '@angular/compiler/src/util';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../components/login/login.component';
import { InterceptorService } from './interceptor.service';
import { LoginService } from './login.service';
import {BehaviorSubject, Observable} from "rxjs";
import {Principal} from "../models/principal";
import { LogoutService } from './logout.service';


// class MockLoginService {
//   token: string | null | undefined;
//   currentUserSubject: BehaviorSubject<Principal | null> | undefined;
//   setToken(token1: string | null | undefined){
//     this.token = token1;
//   }

//   setCurrentUserSubjectToNull(){
//     this.currentUserSubject?.next(null);
//   }
// }



describe('LogoutService', () => {
  let service: LogoutService;
  let loginservice: LoginService;
  // let Token = 'Im not Null';
  // // let fixture: ComponentFixture<LogoutService>;
  // const spyLogin = jasmine.createSpyObj('loginservice',['setCurrentUserSubjectToNull','setToken','grabToken']);
  // spyLogin.setCurrentUserSubjectToNull();
  // spyLogin.setToken(Token);
  // spyLogin.grabToken();
  let Token : string; 
  let spyLogin : any;
  beforeEach(() => {
    Token = 'Im not Null';
    spyLogin = jasmine.createSpyObj('loginservice',['setCurrentUserSubjectToNull','setToken','grabToken']);
    spyLogin.setCurrentUserSubjectToNull();
    spyLogin.setToken(Token);
    spyLogin.grabToken();

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent
      ],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
      
      ],
      imports: [HttpClientModule]
  
    });
    service = TestBed.inject(LogoutService);
    loginservice = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call logoutUser method', () => {
    expect(service.logoutUser).toBeTruthy();
  });

  it('should set Token to null and Current User Subject To Null', () => {
    service.logoutUser;
    expect(spyLogin.grabToken).toHaveBeenCalled();
    expect(spyLogin.setCurrentUserSubjectToNull).toHaveBeenCalled();
  });

});

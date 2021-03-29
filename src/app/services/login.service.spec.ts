import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";

describe('LoginService', () => {
  let service: LoginService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LoginService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the token correctly', () => {
    const token = 'this is a token';
    service.setToken(token);
    expect(service.grabToken).toEqual('this is a token');
  });

  // it('should login user with correct credentials', () => {
  //   const username = 'cspace';
  //   const password = 'password';
  //   service.authenticate(username, password);
  // });
});

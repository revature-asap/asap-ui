import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Credentials} from "../models/credentials";
import {Principal} from "../models/principal";

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

  it('should login user with correct credentials', () => {
    const creds = new Credentials('cspace', 'password');
    const principal = new Principal(1, 'cspace', 'basic', 'token');

    const username = 'cspace';
    const password = 'password';
    service.authenticate(username, password);

    const req = httpTestingController.expectOne(service.loginUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(creds);

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: principal });
    req.event(expectedResponse);
  });

  it('should return a 404 if the endpoint is not found', () => {

    const username = 'blahblah';
    const password = 'halbhalb';
    service.authenticate(username, password);

    const req = httpTestingController.expectOne(service.loginUrl);

    const msg = '404';
    req.flush(msg, {
      status: 404,
      statusText: 'Not Found'
    });
  });
});

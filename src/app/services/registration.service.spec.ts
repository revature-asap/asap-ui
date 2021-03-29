import { TestBed, inject } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { User } from '../models/user';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let matMod: MatDialogModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        RegistrationService
      ]
    });
    service = TestBed.inject(RegistrationService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    matMod = TestBed.inject(MatDialogModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user and return it', ()=>{
      const newUsr: User = {
        username: 'kalyb.levesque',
        password: 'password',
        firstName: 'kalyb',
        lastName: 'levesque',
        email: 'kalyb369@hotmail.com'

      }

      service.register(newUsr).subscribe(
        data => expect(data).toEqual(newUsr, 'should return the user'),
        fail
      );

      // should have made one request to POST 
        const req = httpTestingController.expectOne(service.registerURL);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(newUsr);
        
        //expect server to return the employee after POST
        const expectedResponse = new HttpResponse({status:201, statusText: 'Created', body: newUsr});
        req.event(expectedResponse);
      });


      it('should return 404 into return of the requested user', () => {
        const newUsr: User = {
          username: 'kalyb.levesque',
          password: 'password',
          firstName: 'kalyb',
          lastName: 'levesque',
          email: 'kalyb369@hotmail.com'
  
        }

        service.register(newUsr).subscribe(
          data => expect(data).toEqual(newUsr, 'should return the user'),
          fail
        );

        const req = httpTestingController.expectOne(service.registerURL);

        // respond with 404 error
        const message = '404 error';
        req.flush(message, {status: 404, statusText: 'Not Found'});
      });
});

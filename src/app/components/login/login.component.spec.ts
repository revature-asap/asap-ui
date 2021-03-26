import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    const spyA = jasmine.createSpyObj('LoginService', ['authenticate']);
    const spyB = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[
        {provide: LoginService, useValue: spyA},
        {provide: Router, useValue: spyB}
      ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    loginServiceSpy = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty forms when rendered', () => {
    const usernameValue = component.formFields.username.value;
    const passwordValue = component.formFields.password.value;

    expect(usernameValue).toBe('');
    expect(passwordValue).toBe('');
  });

  it('should not display the #invalid-credentials-warning initially', () => {
    expect(fixture.nativeElement.querySelector('#invalid-credentials-warning')).toBeFalsy();
  });

  it('should turn username input red if no username is provided when form is submitted', () => {
    component.formFields.username.setValue('');
    component.formFields.password.setValue('sample-password');
    component.login();
    fixture.detectChanges();

    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should turn password input red if no password is provided when form is submitted', () => {
    component.formFields.username.setValue('sample-username');
    component.formFields.password.setValue('');
    component.login();
    fixture.detectChanges();

    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('should display both the required warning if neither a username nor password is provided when form is submitted', () => {
    component.login();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#empty-form-error'))).toBeTruthy();
  });
});

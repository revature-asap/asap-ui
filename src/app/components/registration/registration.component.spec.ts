import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { RegistrationService } from '../../services/registration.service';

import { RegisterEmailConfirmationDialog, RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let registerSpy: jasmine.SpyObj<RegistrationService>;
  // let registerMethod: jasmine.SpyObjMethodNames;
  let registerService: RegistrationService;
  // let dialog: MatDialogRef<RegisterEmailConfirmationDialog>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  let user:User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''

  }

  beforeEach(async () => {
    const spyA = jasmine.createSpyObj('registerService',['register']);
    spyA.register(user);
    await TestBed.configureTestingModule({
      declarations: [ 
        RegistrationComponent,
        RegisterEmailConfirmationDialog ],
      providers:[
        { provide: RegistrationService, useValue: spyA},
        { provide: MatDialog},
        { provide: MatDialogRef, useValue: mockDialogRef},
        { provide: Overlay },
        // { provide: NgControl }
      ],
      imports: [ReactiveFormsModule,
                FormsModule,
                MatDialogModule]
    })
    .compileComponents();

    registerSpy = TestBed.inject(RegistrationService) as jasmine.SpyObj<RegistrationService>;

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form fields when rendered', () => {
    let usernameField = component.newUser.username;
    let passwordField = component.newUser.password;
    let firstNameField = component.newUser.firstName;
    let lastNameField = component.newUser.lastName;
    let emailField = component.newUser.email;

    expect(usernameField).toBe('');
    expect(passwordField).toBe('');
    expect(firstNameField).toBe('');
    expect(lastNameField).toBe('');
    expect(emailField).toBe('');

  });

  it('should work if all fields filled in', () => {
    let username = component.newUser.username = 'username';
    let password = component.newUser.password = 'password';
    let first = component.newUser.firstName = 'first';
    let last = component.newUser.lastName = 'last';
    let email = component.newUser.email = 'kalyb369@hotmail.com';
    fixture.detectChanges();

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(first).toBeTruthy();
    expect(last).toBeTruthy();
    expect(email).toBeTruthy();


  });



  it('should return if username is empty', () => {
    let username = component.newUser.username = '';
    let password = component.newUser.password = 'password';
    let first = component.newUser.firstName = 'first';
    let last = component.newUser.lastName = 'last';
    let email = component.newUser.email = 'kalyb369@hotmail.com';
    fixture.detectChanges();

    expect(username).toBeFalsy();
    expect(password).toBeTruthy();
    expect(first).toBeTruthy();
    expect(last).toBeTruthy();
    expect(email).toBeTruthy();


  });

  it('should return if password is empty', () => {
    let username = component.newUser.username = 'username';
    let password = component.newUser.password = '';
    let first = component.newUser.firstName = 'first';
    let last = component.newUser.lastName = 'last';
    let email = component.newUser.email = 'kalyb369@hotmail.com';
    fixture.detectChanges();

    expect(username).toBeTruthy();
    expect(password).toBeFalsy();
    expect(first).toBeTruthy();
    expect(last).toBeTruthy();
    expect(email).toBeTruthy();


  });

  it('should return if first is empty', () => {
    let username = component.newUser.username = 'username';
    let password = component.newUser.password = 'password';
    let first = component.newUser.firstName = '';
    let last = component.newUser.lastName = 'last';
    let email = component.newUser.email = 'kalyb369@hotmail.com';
    fixture.detectChanges();

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(first).toBeFalsy();
    expect(last).toBeTruthy();
    expect(email).toBeTruthy();


  });

  it('should return if last is empty', () => {
    let username = component.newUser.username = 'username';
    let password = component.newUser.password = 'password';
    let first = component.newUser.firstName = 'first';
    let last = component.newUser.lastName = '';
    let email = component.newUser.email = 'kalyb369@hotmail.com';
    fixture.detectChanges();

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(first).toBeTruthy();
    expect(last).toBeFalsy();
    expect(email).toBeTruthy();


  });


  it('should return if email is empty', () => {
    let username = component.newUser.username = 'username';
    let password = component.newUser.password = 'password';
    let first = component.newUser.firstName = 'first';
    let last = component.newUser.lastName = 'last';
    let email = component.newUser.email = '';
    fixture.detectChanges();

    expect(username).toBeTruthy();
    expect(password).toBeTruthy();
    expect(first).toBeTruthy();
    expect(last).toBeTruthy();
    expect(email).toBeFalsy();


  });

  it('component register method defined', () => {
    component.register();
    fixture.detectChanges();
    expect(component.register).toBeDefined();
  });

  it('register method in component should use registration service', () =>{

    component.register;
    expect(registerSpy.register).toHaveBeenCalled();
  });
});

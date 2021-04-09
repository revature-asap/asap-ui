import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from "../../services/login.service";

/**
 * Login Component typescript file that manipulates the Login Component HTML
 * to be able to grab user information needed for logging the user in, which
 * is the username and the password. Injects the login service to make calls
 * to the backend for confirming the credentials are correct
 */
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  loginSuccess: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loading = false;
    this.submitted = false;
    this.loginSuccess = true;
  }

  /**
   * Returns the form fields of the login form, helpful for shortening
   * the lines that call for the form fields
   */
  get formFields() {
    return this.loginForm.controls;
  }

  /**
   * Login method that is tied to the submit button, will scrape for
   * the user credentials, and if both the username and the password
   * text box hav valid inputs, then those will be sent to the login
   * service. Correct login information will redirect the user
   */
  login = async () => {
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;

    let un = this.formFields.username.value;
    let pw = this.formFields.password.value;

    try{
      await this.loginService.authenticate(un, pw);
      this.loading = false;
      await this.router.navigate(['']);
    }catch (e){
      console.error(e);
      this.loading = false;
      this.loginSuccess = false;
    }
  }

  /**
   * Tied to the register button on the page, this will redirect the user
   * to the register page if they do not have an account with our
   * application
   */
  register = async () => {
    await this.router.navigate(['register']);
  }

  ngOnInit(): void {
  }

}

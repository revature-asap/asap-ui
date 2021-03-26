import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loading: boolean;
  submitted: boolean;
  loginSuccess: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService
  ) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loading = false;
    this.submitted = false;
    this.loginSuccess = true;
  }

  get formFields() {
    return this.loginForm.controls;
  }

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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  //TODO add the actual register route, if not from navbar
  register = async () => {
    await this.router.navigate(['']);
  }

  ngOnInit(): void {
  }

}

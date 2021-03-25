import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
              private router: Router) {
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
    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.submitted = true;

    let un = this.formFields.username.value;
    let pw = this.formFields.password.value;

    console.log('in loginComponent.login ', un, pw);

    await this.delay(5000);

    if(un === 'cspace' && pw === 'password'){
      this.loading = false;
      this.loginSuccess = true;
      await this.router.navigate(['']);
    }else{
      this.loginSuccess = false;
      this.loading = false;
      console.log('invalid credentials');
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

import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { RegistrationService } from '../../services/registration.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {Router} from "@angular/router";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newUser: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }

  errorMessage = '';

  constructor(private registrationService: RegistrationService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

  }

  register() {
    if (!this.newUser.username || !this.newUser.password || !this.newUser.firstName ||
      !this.newUser.lastName || !this.newUser.email)  {
      this.errorMessage = 'All fields must be filled out';
      return;
    }

    this.registrationService.register(this.newUser)
                            .subscribe(user => {
                              this.openModal();
                            });
    console.log("registration component");
    this.errorMessage = '';
  }

  openModal(): void {
    const dialogRef = this.dialog.open(RegisterEmailConfirmationDialog, {
      width: "20%",
      height: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log("email dialog closed");
      // this.newUser.username = '';
      // this.newUser.firstName = '';
      // this.newUser.lastName = '';
      // this.newUser.password = '';
      // this.newUser.email = '';
      this.router.navigate(['login']);
    });
  }

}

@Component({
  selector: 'register-email-confirmation-dialog',
  templateUrl: 'register.email.confirmation.dialog.html'
})
export class RegisterEmailConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<RegisterEmailConfirmationDialog>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}

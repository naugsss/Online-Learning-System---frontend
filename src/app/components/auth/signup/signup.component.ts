import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import * as constants from '../../../shared/constants/auth.constants';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  passwordMatch: boolean = false;
  constructor(
    private authService: AuthService,
    private toast: NgToastService,
    private router: Router
  ) {}
  hide: boolean = true;
  constants = constants.default;

  onSubmit(authForm: NgForm) {
    const username = authForm.value.username;
    const password = authForm.value.password;
    const repassword = authForm.value.repassword;
    const email = authForm.value.email;
    const name = authForm.value.name;
    const noWhitespacePattern = '/^S+$/';

    if (password !== repassword) {
      this.passwordMatch = true;
    } else {
      this.authService.signup(email, name, username, password).subscribe({
        next: (response) => {
          console.log('response', response);
          this.toast.success({
            detail: 'SignUp successfull.',
            summary: 'Please log in',
          });
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.log('error', error);
          this.toast.error({
            detail: 'SignUp failed',
            summary: error.error.error.message,
          });
        },
      });
    }
  }

  toggleIcon() {
    this.hide = !this.hide;
  }
}

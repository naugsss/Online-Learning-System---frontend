import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';

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

  onSubmit(authForm: NgForm): void {
    const username = authForm.value.username;
    const password = authForm.value.password;
    const repassword = authForm.value.repassword;
    const email = authForm.value.email;
    const name = authForm.value.name;

    if (password !== repassword) {
      this.passwordMatch = true;
    } else {
      this.authService.signup(email, name, username, password).subscribe({
        next: (response) => {
          this.toast.success({
            detail: this.constants.SIGN_UP_SUCESS,
            summary: this.constants.HEAD_TO_LOG_IN,
          });
          this.router.navigate(['login']);
        },
        error: (error) => {
          this.toast.error({
            detail: this.constants.SIGN_UP_FAILED,
            summary: error.error.error.message,
          });
        },
      });
    }
  }

  toggleIcon(): void {
    this.hide = !this.hide;
  }
}

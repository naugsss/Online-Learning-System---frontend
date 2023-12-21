import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

import { AuthService } from 'src/app/services/auth.service';
import * as constants from '../../../assets/constants/auth.constants';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}
  constants = constants.default;
  isLoading = false;
  hide: boolean = true;
  onSubmit(authForm: NgForm) {
    const username = authForm.value.username;
    const password = authForm.value.password;
    this.isLoading = true;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toast.success({
          detail: 'Logged In',
          summary: 'Log in successfully',
        });
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        this.isLoading = false;
        this.toast.error({
          detail: error.error.error.message,
          summary: 'Please enter valid credentials',
        });
      },
    });
  }

  toggleIcon() {
    this.hide = !this.hide;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { AuthService } from 'src/app/services/auth.service';
import { cartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  showProfileOptions = false;
  cartItemNumber = 0;
  userData = {};
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: cartService
  ) {}
  ngOnInit(): void {
    console.log('header component initialized');
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.cartService.getCartItemNumber().subscribe((count) => {
      this.cartItemNumber = count;
    });

    if (localStorage.getItem('userData')) {
      this.isAuthenticated = true;
    }



  }
  toggleProfileOptions() {
    this.showProfileOptions = !this.showProfileOptions;
  }
  onLogout() {
    this.authService.logout();
    this.showProfileOptions = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.showProfileOptions = false;
  }
}

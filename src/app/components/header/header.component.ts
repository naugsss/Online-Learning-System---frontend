import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../../services/cart.service';
import * as constants from '../../shared/constants/home_constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  showProfileOptions = false;
  cartItemNumber = 0;
  userRole = 4;
  isAdmin: boolean = false;
  isMentor: boolean = false;
  subscription: Subscription[] = [];
  constants = constants.default;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.subscription.push(
      this.authService.user.subscribe((user) => {
        this.isAuthenticated = !!user;
        if (user) {
          this.isAdmin = user.role === 1;
          this.isMentor = user.role === 3;
        }
      })
    );

    this.subscription.push(
      this.cartService.getCartItemNumber().subscribe((count) => {
        this.cartItemNumber = count;
      })
    );
  }

  toggleProfileOptions(): void {
    this.showProfileOptions = !this.showProfileOptions;
  }

  onLogout(): void {
    this.authService.logout();
    this.showProfileOptions = false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
    this.showProfileOptions = false;
  }
}

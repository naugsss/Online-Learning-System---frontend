import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { cartService } from '../../services/cart.service';

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
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private cartService: cartService
  ) {}
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (user) {
        this.isAdmin = user.role === 1;
        this.isMentor = user.role === 3;
      }
    });

    this.cartService.getCartItemNumber().subscribe((count) => {
      this.cartItemNumber = count;
    });
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

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { Course } from '../courses/course/course.model';
import { CourseDataService } from 'src/app/shared/courseData.service';
import * as constants from '../../shared/constants/cart.constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  subscription: Subscription[] = [];
  emptyCartImage: string = null;
  constants = constants.default;
  constructor(
    private cartService: CartService,
    private courseDataService: CourseDataService
  ) {}

  cart: Course[] = [];

  ngOnInit(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    } else {
      this.subscription.push(
        this.cartService.getCart().subscribe((cart) => {
          this.cart = cart;
          this.emptyCartImage = this.cartService.emptyCartImage;
        })
      );
    }
  }

  onBuyNowClick(course: Course): void {
    this.courseDataService.purchaseCourse(course);
    this.onRemoveClick(course.name);
    this.updateCart();
  }

  onRemoveClick(courseName: string): void {
    this.cartService.removeFromCart(courseName);
    this.updateCart();
  }

  updateCart(): void {
    this.subscription.push(
      this.cartService.cartSub.subscribe((cart) => {
        this.cart = cart;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => subscription.unsubscribe());
  }

  calculateSubtotalPrice(): number {
    return this.cart.reduce((sum, course) => sum + course.price, 0);
  }
}

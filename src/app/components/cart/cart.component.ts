import { Component, OnInit } from '@angular/core';

import { cartService } from '../../services/cart.service';
import { Course } from '../courses/course/course.model';
import { CourseDataService } from 'src/app/shared/courseData.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  emptyCartImage: string = null;
  constructor(
    private cartService: cartService,
    private courseDataService: CourseDataService
  ) {}

  cart: Course[] = [];

  ngOnInit(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    } else {
      this.cartService.getCart().subscribe((cart) => {
        this.cart = cart;
        this.emptyCartImage = this.cartService.emptyCartImage;
      });
    }
  }

  onBuyNowClick(course: Course) {
    this.courseDataService.purchaseCourse(course);
    this.onRemoveClick(course.name);
    this.updateCart();
  }

  onRemoveClick(courseName: string) {
    this.cartService.removeFromCart(courseName);
    this.updateCart();
  }

  updateCart() {
    this.cartService.cartSub.subscribe((cart) => {
      this.cart = cart;
    });
  }

  calculateSubtotalPrice(): number {
    return this.cart.reduce((sum, course) => sum + course.price, 0);
  }
}

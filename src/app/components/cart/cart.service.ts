import { Injectable } from '@angular/core';
import { Course } from '../courses/course/course.model';
import { NgToastService } from 'ng-angular-popup';
import { BehaviorSubject, Observable, Subject, Subscription, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class cartService {
  private cart: Course[] = [];
  public cartItemNumber: number = 0;
  emptyCartImage: string = 'src/assets/cart/empty.svg';
  cartSub = new BehaviorSubject<Course[]>(this.cart);
  cartItemNumberSub = new Subject<number>();

  constructor(private toast: NgToastService) {}

  addToCart(course: Course) {
    this.cart.push(course);
    this.cartItemNumber++;
    this.cartSub.next(this.cart);
    this.cartItemNumberSub.next(this.cartItemNumber);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.toast.success({ detail: 'Course added successfully to the cart' });
  }

  removeFromCart(courseName: string) {
    this.cartItemNumber--;
    this.cart = this.cart.filter((course) => course.name !== courseName);
    this.cartSub.next(this.cart);
    this.cartItemNumberSub.next(this.cartItemNumber);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCart(): Observable<Course[]> {
    return this.cartSub.asObservable();
  }

  getCartItemNumber(): Observable<number> {
    return this.cartItemNumberSub.asObservable().pipe(
      map((count) => {
        if (count === 0) {
          this.emptyCartImage = 'src/assets/cart/empty.svg';
        } else {
          this.emptyCartImage = null;
        }
        return count;
      })
    );
  }
}

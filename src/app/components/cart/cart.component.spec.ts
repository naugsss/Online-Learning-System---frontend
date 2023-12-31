import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CourseDataService } from 'src/app/shared/courseData.service';
import { Course } from '../courses/course/course.model';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockCartService;
  let mockCourseDataService;
  let cartSub: BehaviorSubject<Course[]>;

  beforeEach(() => {
    cartSub = new BehaviorSubject<Course[]>([]);
    mockCartService = {
      getCart: jasmine.createSpy('getCart'),
      removeFromCart: jasmine.createSpy('removeFromCart'),
      cartSub: cartSub,
    };
    mockCourseDataService = jasmine.createSpyObj(['purchaseCourse']);

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: CourseDataService, useValue: mockCourseDataService },
      ],
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should load cart from localStorage if it exists', () => {
    const cartData = [
      {
        name: 'Test Course',
        rating: 4,
        status: 'active',
        approval_status: 'approved',
        price: 100,
        duration: 12,
      },
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cartData));

    component.ngOnInit();

    expect(component.cart).toEqual(cartData);
  });

  it('should load cart from service if it does not exist in localStorage', () => {
    const cartData = [
      {
        name: 'Test Course',
        rating: 4,
        status: 'active',
        approval_status: 'approved',
        price: 100,
        duration: 12,
      },
    ];
    mockCartService.getCart.and.returnValue(of(cartData));
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.ngOnInit();

    expect(component.cart).toEqual(cartData);
    expect(mockCartService.getCart).toHaveBeenCalled();
  });

  it('should update cart when a course is purchased', () => {
    const course = {
      name: 'Test Course',
      rating: 4,
      status: 'active',
      approval_status: 'approved',
      price: 100,
      duration: 12,
    };
    cartSub.next([course]);

    component.onBuyNowClick(course);

    expect(mockCourseDataService.purchaseCourse).toHaveBeenCalledWith(course);
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(course.name);
    expect(component.cart).toEqual([course]);
  });

  it('should update cart when a course is removed', () => {
    const courseName = 'Test Course';
    cartSub.next([]);

    component.onRemoveClick(courseName);

    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(courseName);
    expect(component.cart).toEqual([]);
  });
});

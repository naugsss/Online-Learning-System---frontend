import { TestBed } from '@angular/core/testing';

import { cartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';

describe('cartService', () => {
  let cartSer: cartService;
  let toastService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        cartService,
        {
          provide: toastService,
          useValue: jasmine.createSpyObj('ToastService', ['success']),
        },
      ],
    });
    cartSer = TestBed.inject(cartService);
  });

  //   it('should store and retrieve cart data from local storage', () => {
  //     const mockCourse = {
  //       name: 'Test Course',
  //       price: 100,
  //       duration: 12,
  //       rating: 4.4,
  //       status: 'active',
  //       approval_status: 'approved',
  //     };

  //     cartService.addToCart(mockCourse);

  //     expect(localStorage.getItem('cart')).toContain('Test Course');

  //     localStorage.removeItem('cart');
  //     cartService.cart = [];
  //     cartService.cartItemNumber = 0;
  //     cartService.getCart();

  //     expect(cartService.cart.length).toBe(1);
  //     expect(cartService.cartItemNumber).toBe(1);
  //   });

  it('should add item to the cart', () => {
    const mockCourse = {
      name: 'Test Course',
      price: 100,
      duration: 12,
      rating: 4.4,
      status: 'active',
      approval_status: 'approved',
    };
    cartSer.addToCart(mockCourse);
    expect(localStorage.getItem('cart')).toContain('Test Course');
  });

  afterEach(() => {
    localStorage.removeItem('cart');
  });
});

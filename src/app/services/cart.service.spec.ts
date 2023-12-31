import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';

describe('cartService', () => {
  let cartSer: CartService;
  let toastService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartService,
        {
          provide: toastService,
          useValue: jasmine.createSpyObj('ToastService', ['success']),
        },
      ],
    });
    cartSer = TestBed.inject(CartService);
  });

  it('should remove item from the cart', () => {
    const mockCourse = {
      name: 'Test Course',
      price: 100,
      duration: 12,
      rating: 4.4,
      status: 'active',
      approval_status: 'approved',
    };
    cartSer.addToCart(mockCourse);
    cartSer.removeFromCart(mockCourse.name);
    expect(localStorage.getItem('cart')).not.toContain('Test Course');
  });

  it('should get cart', () => {
    expect(cartSer.getCart()).toEqual(cartSer.cartSub.asObservable());
  });

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

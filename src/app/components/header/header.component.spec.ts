import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeaderComponent } from './header.component';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../auth/login/user.model';

describe('HeaderComponent', () => {
  let mockCartService: CartService;
  let mockAuthService: AuthService;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let user = new BehaviorSubject<User>(null);
  let cartItemNumberSub = new Subject<number>();

  beforeEach(() => {
    mockCartService = jasmine.createSpyObj({ getCartItemNumber: of(0) });
    mockAuthService = jasmine.createSpyObj('AuthService', ['user', 'login']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule, RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: CartService,
          useValue: mockCartService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockAuthService.user = user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the initial values correctly', () => {
    expect(component.showProfileOptions).toBeFalsy();
    expect(component.cartItemNumber).toBe(0);
    expect(component.isAdmin).toBeFalsy();
  });

  it('should update profile when user is logged in', () => {
    mockAuthService.user.next({ username: 'abhi', role: 3, token: 'token' });
    fixture.detectChanges();
    expect(component.isAuthenticated).toBeTruthy();
    expect(component.isAdmin).toBeFalsy();
    expect(component.isMentor).toBeTruthy();
  });

  it('should toggle profile options', () => {
    component.showProfileOptions = false;
    component.toggleProfileOptions();
    expect(component.showProfileOptions).toBeTruthy();
  });
});

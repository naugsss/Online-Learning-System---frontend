import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should login successfully', () => {
    const mockResponse = {
      code: 200,
      message: 'Login successful',
      status: 'success',
      access_token: 'token',
    };
    const user = authService.login('naugs', '1234').subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    const request = httpMock.expectOne('http://127.0.0.1:8000/login');
    request.flush(mockResponse);
    expect(request.request.method).toBe('POST');

    // expect(authService.isLoggedIn()).toBeTruthy();
    // expect(authService.user.value).toBeTruthy();
    // expect(authService.user.value.username).toBe('naugs');
  });

  it('should signup successfully', async () => {
    const mockResponse = {
      code: 201,
      message: 'User created successfully',
      status: 'success',
      access_token: 'token',
    };
    const user = await authService
      .signup('naugs@mail.com', 'aaryan', 'test', '12345')
      .subscribe((data) => {
        expect(data).toBe(mockResponse);
      });
    const request = httpMock.expectOne('http://127.0.0.1:8000/register');
    request.flush(mockResponse);
    expect(request.request.method).toBe('POST');
  });
});

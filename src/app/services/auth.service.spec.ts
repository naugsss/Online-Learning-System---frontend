import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { User } from '../components/auth/login/user.model';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should login successfully', () => {
    const mockResponse = {
      code: 200,
      message: 'Login successful',
      status: 'success',
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoxLCJ1c2VybmFtZSI6Im5hdWdzIiwiZXhwIjoxNzAzNzg0NDQzfQ.Ti6JSU7fNvYkohAXueQHyNT3vghdMnExDVrXO84W6Ns',
    };
    const user = authService.login('test', 'test').subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    const request = httpMock.expectOne('http://127.0.0.1:8000/login');
    request.flush(mockResponse);
    expect(request.request.method).toBe('POST');
    expect(authService.isLoggedIn()).toBeTruthy();
    expect(authService.user.value).toBeTruthy();
    expect(authService.user.value.username).toBe('naugs');
  });

  it('should automcatically log in', () => {
    const user = new User(
      'test',
      1,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoxLCJ1c2VybmFtZSI6Im5hdWdzIiwiZXhwIjoxNzAzNzg0NDQzfQ.Ti6JSU7fNvYkohAXueQHyNT3vghdMnExDVrXO84W6Ns'
    );

    localStorage.setItem('userData', JSON.stringify(user));

    authService.autoLogin();
    expect(authService.user.value).toBeTruthy();
    expect(authService.user.value.username).toBe('test');
  });

  it('should signup successfully', async () => {
    const mockResponse = {
      code: 201,
      message: 'User created successfully',
      status: 'success',
      access_token: 'token',
    };
    const user = await authService
      .signup('naugs@mail.com', 'aaryan', 'naugs', '12345')
      .subscribe((data) => {
        expect(data).toBe(mockResponse);
      });
    const request = httpMock.expectOne('http://127.0.0.1:8000/register');
    request.flush(mockResponse);
    expect(request.request.method).toBe('POST');
  });

  afterEach(() => {
    httpMock.verify();
  });
});

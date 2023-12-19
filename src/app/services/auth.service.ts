import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { User } from '../components/login/user.model';
import { Router } from '@angular/router';

interface AuthResponseData {
  code: number;
  message: string;
  status: string;
  token: string;
}

interface loginResponse {
  role: number;
  userid: number;
  expire: number;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://127.0.0.1:8000/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((response) => {
          this.autoLogin();
          this.handleLogin(response);
        })
      );
  }

  signup(email: string, name: string, username: string, password: string) {
    return this.http.post<AuthResponseData>('http://127.0.0.1:8000/register', {
      email: email,
      name: name,
      username: username,
      password: password,
    });
  }

  isLoggedIn(): boolean {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.token;
  }

  autoLogin() {
    if (this.isLoggedIn()) {
      const userData: {
        username: string;
        role: number;
        token: string;
      } = JSON.parse(localStorage.getItem('userData'));

      const token = userData.token;
      const decodedToken: loginResponse = jwtDecode(token);

      if (decodedToken.expire < new Date().getTime()) {
        console.log('calling autoLogout');
        this.autoLogout(new Date().getTime() - decodedToken.expire);
      } else {
        const user = new User(userData.username, userData.role, userData.token);
        this.user.next(user);
      }
    }
  }

  autoLogout(expirationDuration: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }

  handleLogin(response: any) {
    const jwt_token = response['access_token'];
    const decodedToken: loginResponse = jwtDecode(jwt_token);
    const role = decodedToken['role'];
    const username = decodedToken['username'];
    const user = new User(username, role, jwt_token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}

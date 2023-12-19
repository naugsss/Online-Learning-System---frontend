import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class LoginInterceptorService implements HttpInterceptor {
  constructor(private loginService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.loginService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const headers = request.headers.set(
          'Authorization',
          `Bearer ${user.token}`
        );
        const modifiedReq = request.clone({ headers });
        return next.handle(modifiedReq);
      })
    );
  }
}

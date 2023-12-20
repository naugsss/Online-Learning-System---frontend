import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

export const MentorGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.user.pipe(
    switchMap((user) => {
      const isAuthenticated = !!user;
      if (!isAuthenticated) {
        return of(router.parseUrl('/'));
      }
      if (user.role === 3) {
        return of(true);
      }
      return of(router.parseUrl('/unauthorized'));
    })
  );
};

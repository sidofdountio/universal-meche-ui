import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) =>{
  const authService = inject(AuthService);
  const router = inject(Router);

  const authenticate = authService.isAuthenticated();

  if (authenticate) {
    return true;
  }
  return router.parseUrl('/login');
};

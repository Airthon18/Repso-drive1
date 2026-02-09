import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser') || 'null');

  if (sessionUser && sessionUser.estate) {
    const expectedRole = route.data?.['role'];
    if (!expectedRole || sessionUser.role === expectedRole) {
      return true;
    }
  }


  return router.parseUrl('/login');
};

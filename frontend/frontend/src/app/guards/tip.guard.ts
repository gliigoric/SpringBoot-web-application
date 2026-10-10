import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tipGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const zapis = localStorage.getItem('ulogovan');
  const korisnik = zapis ? JSON.parse(zapis) : null;

  if (korisnik && korisnik.tip === route.data['tip']) {
    return true;
  }
  return router.createUrlTree(['/']);   // nazad na prijavu
};
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

export const RedirectGuard: CanActivateFn = () => {
  const token = inject(AuthService).getAuthorizationToken;
  const router = inject(Router);

  if (token) {
    router.navigate(['/admin']);
    return false;
  }
  return true;
};

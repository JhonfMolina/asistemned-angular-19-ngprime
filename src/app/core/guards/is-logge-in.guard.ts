import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

export const IsLoggeInGuard: CanActivateFn = () => {
  const token = inject(AuthService).getAuthorizationToken;
  const router = inject(Router);

  if (!token) {
    router.navigate(['/']);
    return false;
  }

  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

export const IsLoggeInGuard: CanActivateFn = () => {
  const token = inject(AuthService).getAuthorizationToken;
  const router = inject(Router);
  const verification = inject(AuthService).getAccountVerificationStorage;

  if (!token) {
    router.navigate(['/']);
    return false;
  }

  if (verification == 'verificar') {
    router.navigate(['/auth/verification']);
    return false;
  }

  return true;
};

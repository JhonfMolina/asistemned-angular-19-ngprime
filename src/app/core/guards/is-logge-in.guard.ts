import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@services/storage.service';

export const IsLoggeInGuard: CanActivateFn = () => {
  const token = inject(StorageService).getAuthorizationToken;
  const router = inject(Router);
  const verification = inject(StorageService).getAccountVerificationStorage;

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

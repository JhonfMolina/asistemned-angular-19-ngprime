import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@services/storage.service';

export const RedirectGuard: CanActivateFn = () => {
  const token = inject(StorageService).getAuthorizationToken;
  const router = inject(Router);

  if (token) {
    router.navigate(['/admin']);
    return false;
  }
  return true;
};

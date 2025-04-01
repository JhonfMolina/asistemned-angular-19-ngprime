import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { NotificationService } from '@services/util/notificacion.service';
import { environment } from '../../../environments/environment';

export const GuardRBACGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);
  const _notificationService = inject(NotificationService);

  // if (environment.ENABLE_RBAC) {
  //   const validRBAC: boolean = _authService.getDataPermisosRBAC?.some(
  //     (permisoUsuario: any) =>
  //       (route.data['rbac'] as Array<string>).some(
  //         (permiso) =>
  //           permiso.toLowerCase() === permisoUsuario.nombre.toLowerCase()
  //       )
  //   );

  //   if (!validRBAC) {
  //     _notificationService.showError(
  //       'You do not have permission to access the resource.'
  //     );
  //     _router.navigate(['/admin']);
  //     return false;
  //   }
  // }

  return true;
};

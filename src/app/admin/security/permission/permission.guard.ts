import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { PermissionService } from './permission.service';
import { NotificationService } from '@services/util/notificacion.service';
@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(
    private permissionService: PermissionService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentRoute = state.url;
    const requiredPermissions = route.data['permissions'] as string;

    if (this.permissionService.hasPermission(requiredPermissions)) {
      return true;
    }

    this.notificationService.showError(
      `No tienes permisos para acceder a esta funcionalidad.`
    );

    // this.router.navigate(['/admin']);
    return false;
  }
}

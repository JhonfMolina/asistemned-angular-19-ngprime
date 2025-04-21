import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from './permission.service';

@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective {
  @Input() set appHasPermission(permission: string | string[]) {
    console.log('Permisos de usuario:', permission);

    const hasPermission = Array.isArray(permission)
      ? this.permissionService.hasAnyPermission(permission)
      : this.permissionService.hasPermission(permission);

    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) {}
}

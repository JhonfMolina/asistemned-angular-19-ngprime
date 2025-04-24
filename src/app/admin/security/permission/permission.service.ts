import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private readonly _storageService: StorageService) {}

  // Establecer permisos del usuario
  setPermissions(permissions: string[]): void {
    this._storageService.updateLocalStorage({ permisos: permissions });
  }

  // Verificar si el usuario tiene un permiso
  hasPermission(permission: string): boolean {
    return this._storageService.getPermissionsUser?.includes(permission);
  }

  // Verificar si el usuario tiene al menos uno de los permisos
  hasAnyPermission(permissions: string[]): boolean {
    return permissions.some((perm) =>
      this._storageService.getPermissionsUser?.includes(perm)
    );
  }
}

import { Routes } from '@angular/router';
import { PermissionGuard } from '../../security/permission/permission.guard';

export default [
  {
    path: 'entities-create',
    loadComponent: () => import('./entities-create/entities-create.component'),
    title: 'Entities',
  },
  {
    path: 'entities-update',
    loadComponent: () => import('./entities-update/entities-update.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'entidades.editar' },
    title: 'Entities',
  },
] as Routes;

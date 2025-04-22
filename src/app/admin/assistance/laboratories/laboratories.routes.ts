import { Routes } from '@angular/router';
import { PermissionGuard } from '../../security/permission/permission.guard';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./laboratories-list/laboratories-list.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'laboratorios.listar' },
    title: 'Laboratories',
  },
  {
    path: 'laboratories-create',
    loadComponent: () =>
      import('./laboratories-create/laboratories-create.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'laboratorios.crear' },
    title: 'Laboratories',
  },
  {
    path: 'laboratories-update/:id',
    loadComponent: () =>
      import('./laboratories-update/laboratories-update.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'laboratorios.editar' },
    title: 'Laboratories',
  },
] as Routes;

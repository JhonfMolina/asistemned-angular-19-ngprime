import { Routes } from '@angular/router';
import { PermissionGuard } from '../../security/permission/permission.guard';

export default [
  {
    path: '',
    loadComponent: () => import('./erp-list/erp-list.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'convenios.listar' },
    title: 'Erp',
  },
  {
    path: 'erp-create',
    loadComponent: () => import('./erp-create/erp-create.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'convenios.crear' },
    title: 'Erp',
  },
  {
    path: 'erp-update/:id',
    loadComponent: () => import('./erp-update/erp-update.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'convenios.editar' },
    title: 'Erp',
  },
] as Routes;

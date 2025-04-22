import { Routes } from '@angular/router';
import { PermissionGuard } from '../../security/permission/permission.guard';

export default [
  {
    path: '',
    loadComponent: () => import('./pharmacies-list/pharmacies-list.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'farmacias.listar' },
    title: 'Pharmacies',
  },
  {
    path: 'pharmacies-create',
    loadComponent: () =>
      import('./pharmacies-create/pharmacies-create.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'laboratorios.crear' },
    title: 'Pharmacies',
  },
  {
    path: 'pharmacies-update/:id',
    loadComponent: () =>
      import('./pharmacies-update/pharmacies-update.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'laboratorios.editar' },
    title: 'Pharmacies',
  },
] as Routes;

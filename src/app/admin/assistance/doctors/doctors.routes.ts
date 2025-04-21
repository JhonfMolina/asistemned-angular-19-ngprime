import { Routes } from '@angular/router';
import { PermissionGuard } from '../../security/permission/permission.guard';

export default [
  {
    path: '',
    loadComponent: () => import('./doctors-list/doctors-list.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'medicos.listar' },
    title: 'Doctors',
  },
  {
    path: 'doctors-create',
    loadComponent: () => import('./doctors-create/doctors-create.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'medicos.crear' },
    title: 'Doctors',
  },
  {
    path: 'doctors-update/:id',
    loadComponent: () => import('./doctors-update/doctors-update.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'medicos.editar' },
    title: 'Doctors',
  },
] as Routes;

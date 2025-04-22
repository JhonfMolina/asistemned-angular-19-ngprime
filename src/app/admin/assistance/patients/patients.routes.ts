import { Routes } from '@angular/router';
import { PermissionGuard } from '../../security/permission/permission.guard';

export default [
  {
    path: '',
    loadComponent: () => import('./patients-list/patients-list.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'pacientes.listar' },
    title: 'Patients',
  },
  {
    path: 'patients-create',
    loadComponent: () => import('./patients-create/patients-create.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'pacientes.crear' },
    title: 'Patients',
  },
  {
    path: 'patients-update/:id',
    loadComponent: () => import('./patients-update/patients-update.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'pacientes.editar' },
    title: 'Patients',
  },
] as Routes;

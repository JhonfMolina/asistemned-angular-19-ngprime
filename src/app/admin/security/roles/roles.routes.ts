import { Routes } from '@angular/router';
import { PermissionGuard } from '../permission/permission.guard';

export default [
  {
    path: '',
    loadComponent: () => import('./roles-list/roles-list.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'roles.listar' },
    title: 'Roles',
  },
  {
    path: 'roles-create',
    loadComponent: () => import('./roles-create/roles-create.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'roles.crear' },
    title: 'Roles',
  },
  {
    path: 'roles-update/:id',
    loadComponent: () => import('./roles-update/roles-update.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'roles.editar' },
    title: 'Roles',
  },
] as Routes;

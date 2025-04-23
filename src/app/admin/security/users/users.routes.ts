import { Routes } from '@angular/router';
import { PermissionGuard } from '../permission/permission.guard';

export default [
  {
    path: '',
    loadComponent: () => import('./users-list/users-list.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'usuarios.listar' },
    title: 'Users',
  },
  {
    path: 'users-create',
    loadComponent: () => import('./users-create/users-create.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'usuarios.crear' },
    title: 'Users',
  },
  {
    path: 'users-update/:id',
    loadComponent: () => import('./users-update/users-update.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'usuarios.editar' },
    title: 'Users',
  },
] as Routes;

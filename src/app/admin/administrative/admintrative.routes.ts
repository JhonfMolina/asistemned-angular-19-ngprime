import { Routes } from '@angular/router';
import { PermissionGuard } from '../security/permission/permission.guard';

export default [
  {
    path: 'employees',
    loadComponent: () => import('./employees/employees.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'empleados.listar' },
    title: 'Employees',
  },
  {
    path: 'entities',
    loadChildren: () => import('./entities/entities.routes'),
    title: 'Entities',
  },
  {
    path: 'erp',
    loadChildren: () => import('./erp/erp.routes'),
    canActivate: [PermissionGuard],
    data: { permissions: 'convenios.listar' },
    title: 'Erp',
  },
] as Routes;

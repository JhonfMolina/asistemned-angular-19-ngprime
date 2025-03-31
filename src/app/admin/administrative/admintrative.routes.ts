import { Routes } from '@angular/router';

export default [
  {
    path: 'employees',
    loadComponent: () => import('./employees/employees.component'),
    title: 'Employees',
  },
  {
    path: 'entities',
    loadComponent: () => import('./entities/entities.component'),
    title: 'Entities',
  },
  {
    path: 'erp',
    loadChildren: () => import('./erp/erp.routes'),
    title: 'Erp',
  },
] as Routes;

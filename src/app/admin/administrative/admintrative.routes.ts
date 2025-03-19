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
    loadComponent: () => import('./erp/erp.component'),
    title: 'Erp',
  },
] as Routes;

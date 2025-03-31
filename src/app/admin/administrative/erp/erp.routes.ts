import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./erp-list/erp-list.component'),
    title: 'Erp',
  },
  {
    path: 'erp-create',
    loadComponent: () => import('./erp-create/erp-create.component'),
    title: 'Erp',
  },
  {
    path: 'erp-update/:id',
    loadComponent: () => import('./erp-update/erp-update.component'),
    title: 'Erp',
  },
] as Routes;

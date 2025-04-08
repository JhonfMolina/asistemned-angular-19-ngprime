import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./users-list/users-list.component'),
    title: 'Users',
  },
  {
    path: 'users-create',
    loadComponent: () => import('./users-create/users-create.component'),
    title: 'Users',
  },
  {
    path: 'users-update/:id',
    loadComponent: () => import('./users-update/users-update.component'),
    title: 'Users',
  },
] as Routes;

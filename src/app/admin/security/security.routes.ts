import { Routes } from '@angular/router';

export default [
  {
    path: 'roles',
    loadComponent: () => import('./roles/roles.component'),
    title: 'Roles',
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component'),
    title: 'Users',
  },
] as Routes;

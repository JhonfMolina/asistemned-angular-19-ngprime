import { Routes } from '@angular/router';

export default [
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.routes'),
    title: 'Roles',
  },
  {
    path: 'users',
    loadChildren: () => import('./users/roles.routes'),
    title: 'Users',
  },
] as Routes;

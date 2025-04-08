import { Routes } from '@angular/router';

export default [
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.routes'),
    title: 'Roles',
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes'),
    title: 'Users',
  },
] as Routes;

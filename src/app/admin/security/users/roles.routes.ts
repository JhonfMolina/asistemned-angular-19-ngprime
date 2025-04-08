import { Routes } from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () =>
      import('./users-list/users-list.component'),
    title: 'Users',
  },
  {
    path: 'users-create',
    loadComponent: () =>
      import('./users-create/users-create.component'),
    title: 'Users',
  },
] as Routes
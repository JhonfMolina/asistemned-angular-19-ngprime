import { Routes } from "@angular/router";

export default [
  {
    path: '',
    loadComponent: () =>
      import('./roles-list/roles-list.component'),
    title: 'Roles',
  },
  {
    path: 'roles-create',
    loadComponent: () =>
      import('./roles-create/roles-create.component'),
    title: 'Roles',
  },
  {
    path: 'roles-update/:id',
    loadComponent: () =>
      import('./roles-update/roles-update.component'),
    title: 'Roles',
  },
] as Routes
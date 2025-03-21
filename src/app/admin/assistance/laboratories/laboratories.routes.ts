import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./laboratories-list/laboratories-list.component'),
    title: 'Laboratories',
  },
  {
    path: 'laboratories-create',
    loadComponent: () =>
      import('./laboratories-create/laboratories-create.component'),
    title: 'Laboratories',
  },
  {
    path: 'laboratories-update',
    loadComponent: () =>
      import('./laboratories-update/laboratories-update.component'),
    title: 'Laboratories',
  },
] as Routes;

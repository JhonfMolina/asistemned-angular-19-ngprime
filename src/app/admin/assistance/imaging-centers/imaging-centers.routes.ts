import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./imaging-centers-list/imaging-centers-list.component'),
    title: 'Imaging Centers',
  },
  {
    path: 'imaging-centers-create',
    loadComponent: () =>
      import('./imaging-centers-create/imaging-centers-create.component'),
    title: 'Imaging Centers',
  },
  {
    path: 'imaging-centers-update',
    loadComponent: () =>
      import('./imaging-centers-update/imaging-centers-update.component'),
    title: 'Imaging Centers',
  },
] as Routes;

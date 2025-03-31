import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pharmacies-list/pharmacies-list.component'),
    title: 'Pharmacies',
  },
  {
    path: 'pharmacies-create',
    loadComponent: () =>
      import('./pharmacies-create/pharmacies-create.component'),
    title: 'Pharmacies',
  },
  {
    path: 'pharmacies-update/:id',
    loadComponent: () =>
      import('./pharmacies-update/pharmacies-update.component'),
    title: 'Pharmacies',
  },
] as Routes;

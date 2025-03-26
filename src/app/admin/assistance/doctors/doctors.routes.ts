import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./doctors-list/doctors-list.component'),
    title: 'Doctors',
  },
  {
    path: 'doctors-create',
    loadComponent: () => import('./doctors-create/doctors-create.component'),
    title: 'Doctors',
  },
  {
    path: 'doctors-update/:id',
    loadComponent: () => import('./doctors-update/doctors-update.component'),
    title: 'Doctors',
  },
] as Routes;

import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./patients-list/patients-list.component'),
    title: 'Patients',
  },
  {
    path: 'patients-create',
    loadComponent: () => import('./patients-create/patients-create.component'),
    title: 'Patients',
  },
  {
    path: 'patients-update/:id',
    loadComponent: () => import('./patients-update/patients-update.component'),
    title: 'Patients',
  },
] as Routes;

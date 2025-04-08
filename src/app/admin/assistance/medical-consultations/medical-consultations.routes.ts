import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import(
        './medical-consultations-list/medical-consultations-list.component'
      ),
    title: 'Medical Consultations',
  },
  {
    path: 'medical-consultations-create',
    loadComponent: () =>
      import(
        './medical-consultations-create/medical-consultations-create.component'
      ),
    title: 'Medical Consultations',
  },
  {
    path: 'medical-consultations-update/:id',
    loadComponent: () =>
      import(
        './medical-consultations-update/medical-consultations-update.component'
      ),
    title: 'Medical Consultations',
  },
] as Routes;

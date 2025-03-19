import { Routes } from '@angular/router';

export default [
  {
    path: 'doctors',
    loadComponent: () => import('./doctors/doctors.component'),
    title: 'Doctors',
  },
  {
    path: 'patients',
    loadComponent: () => import('./patients/patients.component'),
    title: 'Patients',
  },
  {
    path: 'pharmacies',
    loadComponent: () => import('./pharmacies/pharmacies.component'),
    title: 'Pharmacies',
  },
  {
    path: 'clinical-histories',
    loadComponent: () =>
      import('./clinical-histories/clinical-histories.component'),
    title: 'Clinical Histories',
  },
  {
    path: 'imaging-centers',
    loadComponent: () => import('./imaging-centers/imaging-centers.component'),
    title: 'Imaging Centers',
  },
  {
    path: 'laboratories',
    loadComponent: () => import('./laboratories/laboratories.component'),
    title: 'Laboratories',
  },
  {
    path: 'medical-orders',
    loadComponent: () => import('./medical-orders/medical-orders.component'),
    title: 'Medical Orders',
  },
  {
    path: 'medical-consultations',
    loadComponent: () =>
      import('./medical-consultations/medical-consultations.component'),
    title: 'Medical Consultations',
  },
] as Routes;

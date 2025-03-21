import { Routes } from '@angular/router';

export default [
  {
    path: 'doctors',
    loadChildren: () => import('./doctors/doctors.routes'),
    title: 'Doctors',
  },
  {
    path: 'patients',
    loadChildren: () => import('./patients/patients.routes'),
    title: 'Patients',
  },
  {
    path: 'pharmacies',
    loadChildren: () => import('./pharmacies/pharmacies.routes'),
    title: 'Pharmacies',
  },
  {
    path: 'imaging-centers',
    loadChildren: () => import('./imaging-centers/imaging-centers.routes'),
    title: 'Imaging Centers',
  },
  {
    path: 'laboratories',
    loadChildren: () => import('./laboratories/laboratories.routes'),
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
  {
    path: 'clinical-histories',
    loadComponent: () =>
      import('./clinical-histories/clinical-histories.component'),
    title: 'Clinical Histories',
  },
] as Routes;

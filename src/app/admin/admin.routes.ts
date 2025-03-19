import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export default [
  {
    path: '',
    loadComponent: () => import('./admin.component'),
    children: [
      { path: '', component: DashboardComponent, title: 'Dashboard' },
      {
        path: 'administrative',
        loadChildren: () => import('./administrative/admintrative.routes'),
        title: 'Administrative',
      },
      {
        path: 'assistance',
        loadChildren: () => import('./assistance/assistance.routes'),
        title: 'Assistance',
      },
      {
        path: 'security',
        loadChildren: () => import('./security/security.routes'),
        title: 'Security',
      },
      {
        path: 'tools',
        loadChildren: () => import('./tools/tools.routes'),
        title: 'Tools',
      },
    ],
  },
] as Routes;

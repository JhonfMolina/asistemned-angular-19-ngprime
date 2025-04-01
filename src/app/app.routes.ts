import { Routes } from '@angular/router';
import { IsLoggeInGuard } from '@guards/is-logge-in.guard';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home.component') },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes') },
  {
    path: 'admin',
    canActivate: [IsLoggeInGuard],
    loadChildren: () => import('./admin/admin.routes'),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

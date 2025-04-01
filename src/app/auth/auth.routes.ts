import { Routes } from '@angular/router';
import { RedirectGuard } from '@guards/redirect.guard';

export default [
  {
    path: 'login',
    canActivate: [RedirectGuard],
    loadComponent: () => import('./login/login.component'),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component'),
    title: 'Register',
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./forget-password/forget-password.component'),
    title: 'Recover password',
  },
] as Routes;

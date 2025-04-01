import { Routes } from '@angular/router';
import { RedirectGuard } from '@guards/redirect.guard';

export default [
  {
    path: 'sign-in',
    canActivate: [RedirectGuard],
    loadComponent: () => import('./login/login.component'),
    title: 'Sign in',
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./register/register.component'),
    title: 'Sign up',
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./forget-password/forget-password.component'),
    title: 'Recover password',
  },
] as Routes;

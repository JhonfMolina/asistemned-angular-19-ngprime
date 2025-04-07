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
    path: 'verification',
    loadComponent: () =>
      import('./account-verification/account-verification.component'),
    title: 'Verification',
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./forget-password/forget-password.component'),
    title: 'Recover password',
  },
] as Routes;

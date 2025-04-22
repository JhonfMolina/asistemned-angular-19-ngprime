import { Routes } from '@angular/router';
import { PermissionGuard } from '../../security/permission/permission.guard';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./imaging-centers-list/imaging-centers-list.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'centro-imagenes.listar' },
    title: 'Imaging Centers',
  },
  {
    path: 'imaging-centers-create',
    loadComponent: () =>
      import('./imaging-centers-create/imaging-centers-create.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'centro-imagenes.crear' },
    title: 'Imaging Centers',
  },
  {
    path: 'imaging-centers-update/:id',
    loadComponent: () =>
      import('./imaging-centers-update/imaging-centers-update.component'),
    canActivate: [PermissionGuard],
    data: { permissions: 'centro-imagenes.editar' },
    title: 'Imaging Centers',
  },
] as Routes;

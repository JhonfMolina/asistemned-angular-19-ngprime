import { Component, inject, Input, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { RouterModule } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { DefaultImagePipe } from '../../pipes/default-image.pipe';
import { SidebarService } from '@services/util/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    DrawerModule,
    AvatarModule,
    DividerModule,
    AccordionModule,
    CommonModule,
    RouterModule,
    DefaultImagePipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected fechaActual = new Date();
  private _authService = inject(AuthService);
  profile = this._authService.getUserProfileStorage;
  visible = false;

  constructor(private _sidebarService: SidebarService) {}

  ngOnInit(): void {
    this._sidebarService.visible$.subscribe((isVisible) => {
      this.visible = isVisible;
    });
  }

  closeSidebar(): void {
    this._sidebarService.close();
  }

  menuPrincipal = [
    {
      title: 'Administración',
      icon: 'slider',
      marker: 'administracion',
      menuItems: [
        {
          path: '/admin/administrative/entities',
          permiso: 'administracion-entidades',
          title: 'Entidad de Salud',
        },
        {
          path: '/admin/administrative/erp',
          permiso: 'administracion-clientes',
          title: 'ERP',
        },
        {
          path: '/admin/administrative/employees',
          permiso: 'administracion-empleados',
          title: 'Empleados',
        },
      ],
      permiso: 'administracion',
      show: false,
    },
    {
      title: 'Asistencial',
      icon: 'clinic',
      marker: 'asistencial',
      menuItems: [
        {
          path: '/admin/assistance/doctors',
          permiso: 'asistencial-medicos',
          title: 'Medicos',
        },
        {
          path: '/admin/assistance/patients',
          permiso: 'asistencial-pacientes',
          title: 'Pacientes',
        },
        {
          path: '/admin/assistance/medical-consultations',
          permiso: 'asistencial-consulta-medicas',
          title: 'Consultas medicas',
        },
        {
          path: '/admin/assistance/clinical-histories',
          permiso: 'asistencial-historia-clinica',
          title: 'Historias clinicas',
        },
        {
          path: '/admin/assistance/medical-orders',
          permiso: 'asistencial-orden-medicas',
          title: 'Ordenes medicas',
        },
        {
          path: '/admin/assistance/imaging-centers',
          permiso: '',
          title: 'Centro de imagenes',
        },
        {
          path: '/admin/assistance/pharmacies',
          permiso: 'asistencial-farmacias',
          title: 'Farmacias',
        },
        {
          path: '/admin/assistance/laboratories',
          permiso: 'asistencial-laboratorios',
          title: 'Laboratorios',
        },
      ],
      permiso: 'asistencial',
      show: false,
    },
    {
      title: 'Seguridad',
      icon: 'shield-quarter',
      marker: 'security',
      menuItems: [
        {
          path: '/admin/security/users',
          permiso: 'seguridad-usuarios',
          title: 'Usuarios',
        },
        {
          path: '/admin/security/roles',
          permiso: 'seguridad-roles',
          title: 'Roles',
        },
      ],
      permiso: 'seguridad',
      show: false,
    },
    {
      title: 'Herramientas',
      icon: 'wrench',
      marker: 'parameters',
      menuItems: [
        {
          path: '/admin/tools/campos-adicionales',
          permiso: 'libreria-ca-grupos',
          title: 'Campos adicionales',
        },
      ],
      permiso: 'libreria',
      show: false,
    },
  ];
}

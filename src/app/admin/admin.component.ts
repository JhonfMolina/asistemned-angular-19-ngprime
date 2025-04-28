import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { SidebarService } from '@services/util/sidebar.service';
import { NotificationService } from '@services/util/notificacion.service';
import { AuthService } from '@services/auth.service';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { StorageService } from '@services/storage.service';
import { UsersService } from '@services/users.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { PermissionService } from './security/permission/permission.service';

@Component({
  selector: 'app-admin',
  imports: [
    RouterOutlet,
    ButtonModule,
    CommonModule,
    CardModule,
    DividerModule,
    Toolbar,
    SidebarComponent,
    Menu,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export default class AdminComponent {
  visible: boolean = false;
  toggle = false;
  items: MenuItem[] | undefined;
  private readonly subscription: Subscription[] = [];

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private readonly _usersService: UsersService,
    protected readonly _storageService: StorageService,
    private readonly _permissionService: PermissionService,
    private readonly _notificationService: NotificationService,
    private readonly _authService: AuthService
  ) {
    this.items = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Gestionar perfil',
            icon: 'bx bx-user',
          },
          {
            label: 'Cerrar sesion',
            icon: 'bx bx-exit',
            command: () => {
              _notificationService.confirmation({
                message: '¿Esta seguro en salir de la aplicacion?',
                accept: () => {
                  _authService.onSignUp();
                },
                reject: () => {
                  return;
                },
              });
            },
          },
        ],
      },
    ];
  }

  openSidebar(): void {
    this.sidebarService.open();
  }

  toogleDarkMode(): void {
    this.toggle = !this.toggle;
    const element = document.querySelector('html');
    if (this.toggle) {
      element!.classList.add('my-app-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      element!.classList.remove('my-app-dark');
      localStorage.setItem('theme', 'light');
    }
  }

  onNavigate() {
    if (this._storageService.getEntityStorage == null) {
      this.router.navigate(['/admin/administrative/entities/entities-create']);
    } else {
      this.router.navigate(['/admin']);
    }
  }

  setPermissions(): void {
    if (this._storageService.getEntityStorage != null) {
      this.subscription.push(
        this._usersService
          .getByIdUserRole({
            estados: ['activo'],
            id: this._storageService.getUserProfileStorage.id!,
            ma_entidad_id: this._storageService.getEntityStorage.id!,
          })
          .subscribe((res) => {
            const userPermissions: Array<string> = [];
            res.data.acl.forEach((perm) => {
              JSON.parse(perm.acl_rol_per_acciones).forEach(
                (permiso: string) => {
                  userPermissions.push(`${perm.acl_per_recurso}.${permiso}`);
                }
              );
            });
            this._permissionService.setPermissions(userPermissions);
          })
      );
    }
  }

  ngOnInit(): void {
    this.setPermissions();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.toggle = true;
      document.querySelector('html')!.classList.add('my-app-dark');
    }
    if (this._storageService.getEntityStorage == null) {
      this.router.navigate(['/admin/administrative/entities/entities-create']);
    }
  }
}

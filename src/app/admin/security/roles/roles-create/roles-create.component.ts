import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Permisos } from '@interfaces/security/permisos.interfaces';
import { Roles } from '@interfaces/security/roles.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { AuthService } from '@services/auth/auth.service';
import { PermisosService } from '@services/security/permisos.service';
import { RolesService } from '@services/security/roles.service';
import { NotificationService } from '@services/util/notificacion.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-roles-create',
  imports: [DynamicFormComponent, CardModule, ButtonComponent],
  templateUrl: './roles-create.component.html',
  styleUrl: './roles-create.component.scss'
})
export default class RolesCreateComponent {

  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private readonly subscription: Subscription[] = [];

  public permiso: Permisos|undefined;

  formBtnConfig = [
    {
      label: 'Guardar',
      icon: 'save bx-sm',
      visible: true,
      width: 'w-full',
      appearance: 'base',
      color: 'primary',
      action: 'guardar',
      disabled: false,
      loading: false,
    },
  ];
  formConfig: DynamicForm[] = [
    {
      type: 'text',
      icon: 'user',
      name: 'nombre',
      label: 'Nombre',
      on_label: 'nombre',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 40,
      },
      column: 'col-12 md:col-6 lg:col-6',
    },
  ];

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _rolesService: RolesService,
    private readonly _permisosService: PermisosService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) { }

  goToReturnUrl(): void {
    this._router.navigate(['admin/security/roles']);
  }

  getListadoPermisos(): void {
    this.subscription.push(
      this._permisosService
        .getlist({ 
          ma_entidad_id: this._authService.getEntityStorage.id.toString(),
        })
        .subscribe((response) => {
          this.permiso = {
            ...response.data.asistencial[0],
            acciones: JSON.parse(response.data.asistencial[0].acciones)
          };
        })
    );
  }

  post(data: any): void {
    const rol: Roles = {
      ...data.form,
      ma_entidad_id: this._authService.getEntityStorage.id.toString(),
    };

    if (this.permiso) {
      const permiso = {
        acl_permiso_id: this.permiso.id,
        acciones: this.permiso.acciones,
        id: '',
        acl_rol_id: '',
        estado: ''
      }
      console.log(permiso);
      rol.permisos = [permiso];
    }

    this.subscription.push(
      this._rolesService.post(rol).subscribe((res) => {
        this._notificationService.showSuccess(res.message);
        setTimeout(() => {
          this._notificationService.confirmation({
            message: '¿Desea crear otro rol?',
            accept: () => {
              this.dynamicFormComponent.resetForm();
            },
            reject: () => {
              this.goToReturnUrl();
            },
          });
        }, 2000);
      })
    );
  }

  ngOnInit(): void {
    this.getListadoPermisos();
  }
}

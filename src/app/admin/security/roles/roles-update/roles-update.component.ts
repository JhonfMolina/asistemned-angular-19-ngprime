import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Permisos } from '@interfaces/security/permisos.interfaces';
import { Roles } from '@interfaces/security/roles.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { AuthService } from '@services/auth/auth.service';
import { PermisosService } from '@services/security/permisos.service';
import { RolesService } from '@services/security/roles.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-roles-update',
  imports: [DynamicFormComponent, CardModule, ButtonComponent],
  templateUrl: './roles-update.component.html',
})
export default class RolesUpdateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private readonly subscription: Subscription[] = [];
  private rolId = '';

  public permiso: Permisos | undefined;

  formBtnConfig = [
    {
      label: 'Actualizar',
      icon: 'bx bx-refresh bx-sm',
      visible: true,
      width: 'w-full',
      appearance: 'base',
      color: 'primary',
      action: 'actualizar',
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
    {
      type: 'checkbox',
      name: 'estado',
      label: 'Estado',
      on_label: 'estado',
      column: 'col-12 md:col-4 lg:col-6',
    },
  ];

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _rolesService: RolesService,
    private readonly _permisosService: PermisosService,
    private readonly route: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _loadingService: LoadingService,
    private readonly _router: Router
  ) {
    this.rolId = this.route.snapshot.paramMap.get('id')!;
  }

  goToReturnUrl(): void {
    this._router.navigate(['admin/security/roles']);
  }

  getListadoPermisos(): void {
    this.subscription.push(
      this._permisosService
        .getlist({
          ma_entidad_id: this._authService.getEntityStorage.id!.toString(),
        })
        .subscribe((response) => {
          this.permiso = {
            ...response.data.asistencial[0],
            acciones: JSON.parse(response.data.asistencial[0].acciones),
          };
        })
    );
  }

  getById(): void {
    if (this.rolId) {
      this.subscription.push(
        this._rolesService
          .getById({
            estados: ['activo'],
            id: this.rolId,
            ma_entidad_id: this._authService.getEntityStorage.id!.toString(),
          })
          .subscribe((rol) => {
            this.dynamicFormComponent.setFormData({
              ...rol.data,
              estado: rol.data.estado == 'activo',
            });
          })
      );
    }
  }

  put(data: any): void {
    const rol: Roles = {
      ...data.form,
      estado: data.form.estado ? 'activo' : 'inactivo',
      ma_entidad_id: this._authService.getEntityStorage.id!.toString(),
    };
    if (this.permiso) {
      const permiso = {
        acl_permiso_id: this.permiso.id,
        acciones: this.permiso.acciones,
        id: '',
        acl_rol_id: '',
        estado: '',
      };
      console.log(permiso);
      rol.permisos = [permiso];
    }
    this.subscription.push(
      this._rolesService.put(this.rolId, rol).subscribe((res) => {
        this._notificationService.showSuccess(res.message);
        this.goToReturnUrl();
      })
    );
  }

  ngOnInit(): void {
    this._loadingService.loading$.subscribe((loading) => {
      this.formBtnConfig.find((btn) => btn.label === 'Actualizar')!.loading =
        loading;
    });
    this.getListadoPermisos();
  }

  ngAfterViewInit() {
    this.getById();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Users } from '@interfaces/security/users.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { AuthService } from '@services/auth/auth.service';
import { RolesService } from '@services/security/roles.service';
import { UsersService } from '@services/security/users.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-users-create',
  imports: [DynamicFormComponent, CardModule, ButtonComponent],
  templateUrl: './users-create.component.html',
})
export default class UsersCreateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private readonly subscription: Subscription[] = [];

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
      type: 'email',
      icon: 'envelope',
      name: 'email',
      label: 'Correo',
      on_label: 'email',
      placeholder: '',
      validators: {
        required: true,
        email: true,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'password',
      icon: 'lock',
      name: 'password',
      label: 'Clave',
      on_label: 'password',
      placeholder: '',
      validators: {
        required: true,
        minLength: 8,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'password',
      icon: 'lock',
      name: 'password_confirmation',
      label: 'Confirmar Clave',
      on_label: 'password_confirmation',
      placeholder: '',
      validators: {
        required: true,
        minLength: 8,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'number',
      icon: 'id-card',
      name: 'identificacion',
      label: 'identificacion',
      on_label: 'identificacion',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'text',
      icon: 'user',
      name: 'name',
      label: 'Nombre',
      on_label: 'name',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 150,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'select',
      name: 'rol_id',
      label: 'Rol',
      on_label: 'rol_id',
      placeholder: '',
      filter: true,
      filterBy: 'nombre',
      showClear: true,
      options: [],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
  ];

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _usersService: UsersService,
    private readonly _rolesService: RolesService,
    private readonly _loadingService: LoadingService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  goToReturnUrl(): void {
    this._router.navigate(['admin/security/users']);
  }

  getListadoRoles(): void {
    this._rolesService
      .getlist({
        estados: ['activo'],
        ma_entidad_id: this._authService.getEntityStorage.id!,
      })
      .subscribe((response) => {
        this.formConfig.find((field) => field.name === 'rol_id')!.options =
          response.data.data;
      });
  }

  post(data: any): void {
    const laboratories: Users = {
      ...data.form,
      ma_entidad_id: this._authService.getEntityStorage.id!.toString(),
      acl_roles: [data.form.rol_id],
    };
    this.subscription.push(
      this._usersService.post(laboratories).subscribe((res) => {
        this._notificationService.showSuccess(res.message);
        setTimeout(() => {
          this._notificationService.confirmation({
            message: '¿Desea crear otro usuario?',
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
    this._loadingService.loading$.subscribe((loading) => {
      this.formBtnConfig.find((btn) => btn.label === 'Guardar')!.loading =
        loading;
    });
    this.getListadoRoles();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

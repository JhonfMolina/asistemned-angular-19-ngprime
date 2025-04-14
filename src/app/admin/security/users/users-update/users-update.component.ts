import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Users } from '@interfaces/users.interfaces';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { AuthService } from '@services/auth.service';
import { RolesService } from '@services/roles.service';
import { UsersService } from '@services/users.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-users-update',
  imports: [DynamicFormComponent, ButtonComponent, CardModule],
  templateUrl: './users-update.component.html',
})
export default class UsersUpdateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private readonly subscription: Subscription[] = [];
  private usuarioId = '';

  formActionButton: ActionButton[] = [
    {
      label: 'Actualizar',
      icon: 'bx bx-refresh bx-sm',
      visible: true,
      width: 'w-full',
      color: 'primary',
      disabled: false,
      loading: false,
      callback: (data: any) => {
        this.put(data);
      },
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
    // {
    //   type: 'password',
    //   icon: 'lock',
    //   name: 'password',
    //   label: 'Clave',
    //   on_label: 'password',
    //   placeholder: '',
    //   validators: {
    //     required: true,
    //     minLength: 8,
    //   },
    //   column: 'col-12 md:col-6 lg:col-4',
    // },
    // {
    //   type: 'password',
    //   icon: 'lock',
    //   name: 'password_confirmation',
    //   label: 'Confirmar Clave',
    //   on_label: 'password_confirmation',
    //   placeholder: '',
    //   validators: {
    //     required: true,
    //     minLength: 8,
    //   },
    //   column: 'col-12 md:col-6 lg:col-4',
    // },
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
    private readonly _usersService: UsersService,
    private readonly _notificationService: NotificationService,
    private readonly route: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _loadingService: LoadingService,
    private readonly _rolesService: RolesService,
    private readonly _router: Router
  ) {
    this.usuarioId = this.route.snapshot.paramMap.get('id')!;
  }

  goToReturnUrl(): void {
    this._router.navigate(['admin/security/users']);
  }

  getById(): void {
    if (this.usuarioId) {
      this.subscription.push(
        this._usersService
          .getById({
            estados: ['activo'],
            id: this.usuarioId,
            ma_entidad_id: this._authService.getEntityStorage.id!,
          })
          .subscribe((usuario) => {
            this.dynamicFormComponent.setFormData({
              ...usuario.data,
              estado: usuario.data.status == 'activo',
            });
          })
      );
    }
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

  put(formData: any): void {
    const usuario: Users = {
      ...formData,
      estado: formData.status ? 'activo' : 'inactivo',
      ma_entidad_id: this._authService.getEntityStorage.id!,
    };
    this.subscription.push(
      this._usersService.put(this.usuarioId, usuario).subscribe((res) => {
        this._notificationService.showSuccess(res.message);
        this.goToReturnUrl();
      })
    );
  }

  ngOnInit(): void {
    this._loadingService.loading$.subscribe((loading) => {
      this.formActionButton.find((btn) => btn.label === 'Actualizar')!.loading =
        loading;
    });
    this.getListadoRoles();
  }

  ngAfterViewInit() {
    this.getById();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

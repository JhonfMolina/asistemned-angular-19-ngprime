import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { UserRole } from '@interfaces/users.interfaces';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { RolesService } from '@services/roles.service';
import { StorageService } from '@services/storage.service';
import { UsersService } from '@services/users.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-users-update',
  imports: [DynamicFormComponent, ButtonModule, CardModule],
  templateUrl: './users-update.component.html',
})
export default class UsersUpdateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private readonly subscription: Subscription[] = [];
  private usuarioId = '';
  protected usuario!: UserRole;
  aclFieldRole: any;

  formActionButton: ActionButton[] = [
    {
      label: 'Actualizar',
      icon: 'bx bx-refresh bx-sm',
      visible: true,
      width: 'w-full',
      color: 'primary',
      disabled: false,
      loading: false,
      permission: 'usuarios.editar',
      callback: (e: any) => {
        this.put(e);
      },
    },
  ];

  formConfig: DynamicForm[] = [
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
      type: 'multiselect',
      name: 'acl_roles',
      label: 'Role',
      on_label: 'acl_roles',
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
    private readonly _storageService: StorageService,
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
          .getByIdUserRole({
            estados: ['activo'],
            id: this.usuarioId,
            ma_entidad_id: this._storageService.getEntityStorage.id!,
          })
          .subscribe((res) => {
            this.usuario = res.data;
            const setRoleUser = Array.from(
              new Map(
                this.usuario.acl.map((obj) => [
                  obj.acl_rol_nombre,
                  { id: obj.acl_rol_id, nombre: obj.acl_rol_nombre },
                ])
              ).values()
            );
            this.aclFieldRole.selectedItems = setRoleUser.map((rol) => {
              return this.aclFieldRole.options.find(
                (option: any) => option.id === rol.id
              );
            });

            this.dynamicFormComponent.setFormData({
              ...this.usuario,
              acl_roles: this.aclFieldRole.selectedItems,
            });
          })
      );
    }
  }

  getListadoRoles(): void {
    this._rolesService
      .getlist({
        estados: ['activo'],
        ma_entidad_id: this._storageService.getEntityStorage.id!,
      })
      .subscribe((response) => {
        if (response) {
          this.aclFieldRole = this.formConfig.find(
            (field) => field.name === 'acl_roles'
          )!;
          this.aclFieldRole.options = response.data.data;
          this.getById();
        }
      });
  }

  put(formData: any): void {
    const usuario: any = {
      ...formData,
      ma_entidad_id: this._storageService.getEntityStorage.id!,
      user_id: this.usuarioId,
      acl_roles: this.formConfig
        .find((field) => field.name === 'acl_roles')!
        .selectedItems?.map((rol: any) => rol.id),
    };
    this.subscription.push(
      this._usersService.put(this.usuarioId, usuario).subscribe((res) => {
        this._notificationService.showSuccess(
          'Usuario actualizado',
          res.message
        );
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

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

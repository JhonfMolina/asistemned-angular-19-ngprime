import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Erp } from '@interfaces/erp.interfaces';
import { Department } from '@interfaces/util/department.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { ErpService } from '@services/erp.service';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { UtilidadesService } from '@services/util/utilidades.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { StorageService } from '@services/storage.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-erp-create',
  imports: [DynamicFormComponent, CardModule, ButtonModule],
  templateUrl: './erp-create.component.html',
})
export default class ErpCreateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;

  private subscription: Subscription[] = [];
  formActionButton: ActionButton[] = [
    {
      label: 'Guardar',
      icon: 'bx bx-save bx-sm',
      visible: true,
      width: 'w-full',
      color: 'primary',
      disabled: false,
      loading: false,
      permission: 'convenios.crear',
      callback: (e: any) => {
        this.post(e);
      },
    },
  ];
  formConfig: DynamicForm[] = [
    {
      type: 'select',
      name: 'utilidad_tipo_identificacion_id',
      label: 'Tipo de identificacion',
      on_label: 'utilidad_tipo_identificacion_id',
      placeholder: '',
      filter: true,
      filterBy: 'nombre',
      showClear: true,
      options: [],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-4 lg:col-2',
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
      column: 'col-12 md:col-4 lg:col-2',
    },
    {
      type: 'text',
      icon: 'user',
      name: 'razon_social',
      label: 'Razon social',
      on_label: 'razon_social',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-4 lg:col-4',
    },
    {
      type: 'tel',
      icon: 'phone',
      name: 'telefono',
      label: 'Contactos',
      on_label: 'contactos',
      placeholder: '',
      validators: {
        required: true,
        minLength: 9,
        maxLength: 14,
        pattern: '^(\\+\\d{1,3}[- ]?)?\\d{10}$',
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'text',
      icon: 'location-plus',
      name: 'direccion',
      label: 'Direccion',
      on_label: 'direccion',
      placeholder: '',
      validators: {
        required: true,
        minLength: 6,
      },
      column: 'col-12 md:col-6 lg:col-4',
    },
    {
      type: 'select',
      name: 'utilidad_departamento_id',
      label: 'Departamento',
      on_label: 'utilidad_departamento_id',
      placeholder: '',
      filter: true,
      filterBy: 'nombre',
      showClear: true,
      options: [],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-4 lg:col-4',
      onChange: (event: any) =>
        this.getListadoCiudadesPorDepartamento(event.value),
    },
    {
      type: 'select',
      name: 'utilidad_ciudad_id',
      label: 'Ciudad',
      on_label: 'utilidad_ciudad_id',
      placeholder: '',
      filter: true,
      filterBy: 'nombre',
      showClear: true,
      options: [],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-4 lg:col-4',
    },
  ];

  constructor(
    private _utilidadesService: UtilidadesService,
    private _notificationService: NotificationService,
    private _erpService: ErpService,
    private _authService: AuthService,
    private _storageService: StorageService,
    private _loadingService: LoadingService,
    private _router: Router
  ) {}

  goToReturnUrl(): void {
    this._router.navigate(['admin/administrative/erp']);
  }

  getListadoTipoIdentificacion(): void {
    this._utilidadesService
      .getListadoTipoIdentificacion({ estados: ['activo'] })
      .subscribe((response) => {
        this.formConfig.find(
          (field) => field.name === 'utilidad_tipo_identificacion_id'
        )!.options = response.data;
      });
  }

  getListadoDepartamentos(): void {
    this._utilidadesService
      .getListadoDepartamentos({ estados: ['activo'] })
      .subscribe((response) => {
        this.formConfig.find(
          (field) => field.name === 'utilidad_departamento_id'
        )!.options = response.data;
      });
  }

  getListadoCiudadesPorDepartamento(department: Department): void {
    if (department) {
      this._utilidadesService
        .getListadoCiudadesPorDepartamento({
          estados: ['activo'],
          utilidad_departamento_id: department,
        })
        .subscribe((response) => {
          this.formConfig.find(
            (field) => field.name === 'utilidad_ciudad_id'
          )!.options = response.data;
        });
    }
  }

  post(data: any): void {
    const erp: Erp = {
      ...data.form,
      ma_entidad_id: this._storageService.getEntityStorage.id!,
    };
    this.subscription.push(
      this._erpService.post(erp).subscribe((res) => {
        this._notificationService.showSuccess(res.message);
        setTimeout(() => {
          this._notificationService.confirmation({
            message: '¿Desea crear otra erp?',
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
      this.formActionButton.find((btn) => btn.label === 'Guardar')!.loading =
        loading;
    });
    this.getListadoTipoIdentificacion();
    this.getListadoDepartamentos();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

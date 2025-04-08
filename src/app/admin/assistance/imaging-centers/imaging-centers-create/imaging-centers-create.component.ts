import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { ImagingCenters } from '@interfaces/admin/imaging-centers.interfaces';
import { Department } from '@interfaces/util/department.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { ImagingCentersService } from '@services/admin/imaging-centers.service';
import { AuthService } from '@services/auth/auth.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { UtilidadesService } from '@services/util/utilidades.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-imaging-centers-create',
  imports: [DynamicFormComponent, CardModule, ButtonComponent],
  templateUrl: './imaging-centers-create.component.html',
})
export default class ImagingCentersCreateComponent {
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
      column: 'col-12 md:col-4 lg:col-3',
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
      column: 'col-12 md:col-4 lg:col-3',
    },
    {
      type: 'text',
      icon: 'user',
      name: 'razon_social',
      label: 'Nombre',
      on_label: 'razon_social',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 150,
      },
      column: 'col-12 md:col-4 lg:col-6',
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
      column: 'col-12 md:col-4 lg:col-4',
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
    {
      type: 'tel',
      icon: 'phone',
      name: 'telefonos',
      label: 'Contactos',
      on_label: 'telefonos',
      placeholder: '',
      validators: {
        required: true,
        minLength: 9,
        maxLength: 14,
        pattern: '^(\\+\\d{1,3}[- ]?)?\\d{10}$',
      },
      column: 'col-12 md:col-4 lg:col-4',
    },
    {
      type: 'textarea',
      name: 'descripcion',
      label: 'Descripción',
      on_label: 'descripcion',
      placeholder: '',
      validators: {
        required: false,
      },
      column: 'col-12',
    },
  ];

  constructor(
    private readonly _utilidadesService: UtilidadesService,
    private readonly _notificationService: NotificationService,
    private readonly _imagingCentersService: ImagingCentersService,
    private _loadingService: LoadingService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  goToReturnUrl(): void {
    this._router.navigate(['admin/assistance/imaging-centers']);
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
    const centroImagenes: ImagingCenters = {
      ...data.form,
      ma_entidad_id: this._authService.getEntityStorage.id!,
    };
    this.subscription.push(
      this._imagingCentersService.post(centroImagenes).subscribe((res) => {
        this._notificationService.showSuccess(res.message);
        setTimeout(() => {
          this._notificationService.confirmation({
            message: '¿Desea crear otro Centro de imagenes?',
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
    this.getListadoTipoIdentificacion();
    this.getListadoDepartamentos();
  }
}

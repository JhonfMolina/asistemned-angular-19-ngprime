import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { ImagingCenters } from '@interfaces/imaging-centers.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { ImagingCentersService } from '@services/imaging-centers.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { UtilidadesService } from '@services/util/utilidades.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { StorageService } from '@services/storage.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-imaging-centers-update',
  imports: [DynamicFormComponent, CardModule, ButtonModule],
  templateUrl: './imaging-centers-update.component.html',
})
export default class ImagingCentersUpdateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private readonly subscription: Subscription[] = [];
  private centroImagenId = '';

  formActionButton: ActionButton[] = [
    {
      label: 'Actualizar',
      icon: 'bx bx-refresh bx-sm',
      visible: true,
      width: 'w-full',
      color: 'primary',
      disabled: false,
      loading: false,
      permission: '',
      callback: (data: any) => {
        this.put(data);
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
      type: 'checkbox',
      name: 'estado',
      label: 'Estado',
      on_label: 'estado',
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
    private readonly route: ActivatedRoute,
    private readonly _storageService: StorageService,
    private readonly _loadingService: LoadingService,
    private readonly _router: Router
  ) {
    this.centroImagenId = this.route.snapshot.paramMap.get('id')!;
  }

  goToReturnUrl(): void {
    this._router.navigate(['admin/assistance/imaging-centers']);
  }

  getListadoTipoIdentificacion(): void {
    this.subscription.push(
      this._utilidadesService
        .getListadoTipoIdentificacion({ estados: ['activo'] })
        .subscribe((response) => {
          this.formConfig.find(
            (field) => field.name === 'utilidad_tipo_identificacion_id'
          )!.options = response.data;
        })
    );
  }

  getListadoDepartamentos(): void {
    this.subscription.push(
      this._utilidadesService
        .getListadoDepartamentos({ estados: ['activo'] })
        .subscribe((response) => {
          this.formConfig.find(
            (field) => field.name === 'utilidad_departamento_id'
          )!.options = response.data;
        })
    );
  }

  getListadoCiudadesPorDepartamento(departmentId: string): void {
    if (departmentId) {
      this.subscription.push(
        this._utilidadesService
          .getListadoCiudadesPorDepartamento({
            estados: ['activo'],
            utilidad_departamento_id: departmentId,
          })
          .subscribe((response) => {
            this.formConfig.find(
              (field) => field.name === 'utilidad_ciudad_id'
            )!.options = response.data;
          })
      );
    }
  }

  getById(): void {
    if (this.centroImagenId) {
      this.subscription.push(
        this._imagingCentersService
          .getById({
            estados: ['activo'],
            id: this.centroImagenId,
            ma_entidad_id: this._storageService.getEntityStorage.id!,
          })
          .subscribe((centroImagenes) => {
            this.dynamicFormComponent.setFormData({
              ...centroImagenes.data,
              estado: centroImagenes.data.estado == 'activo',
            });
            this.getListadoCiudadesPorDepartamento(
              centroImagenes.data.utilidad_departamento_id
            );
          })
      );
    }
  }

  put(formData: any): void {
    const centroImagenes: ImagingCenters = {
      ...formData,
      estado: formData.estado ? 'activo' : 'inactivo',
      ma_entidad_id: this._storageService.getEntityStorage.id!,
    };
    this.subscription.push(
      this._imagingCentersService
        .put(this.centroImagenId, centroImagenes)
        .subscribe((res) => {
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
    this.getListadoTipoIdentificacion();
    this.getListadoDepartamentos();
  }

  ngAfterViewInit() {
    this.getById();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

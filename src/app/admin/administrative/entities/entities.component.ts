import { Component, inject, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Entities } from '@interfaces/admin/entities.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { EntitiesService } from '@services/admin/entities.service';
import { AuthService } from '@services/auth/auth.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { UtilidadesService } from '@services/util/utilidades.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from '../../../../environments/environment';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entities',
  imports: [DynamicFormComponent, CardModule, Message, CommonModule],
  templateUrl: './entities.component.html',
})
export default class EntitiesComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private subscription: Subscription[] = [];
  private _authService = inject(AuthService);
  protected readonly entities = this._authService.getEntityStorage || null;
  formBtnConfig = [
    {
      label: this.entities ? 'Actualizar' : 'Guardar',
      icon: this.entities ? 'bx bx-refresh bx-sm' : 'bx bx-save bx-sm',
      visible: true,
      width: 'w-full',
      appearance: 'base',
      color: 'primary',
      action: this.entities ? 'actualizar' : 'guardar',
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
      },
      column: 'col-12 md:col-4 lg:col-4',
    },
    {
      type: 'tel',
      icon: 'phone',
      name: 'telefonos',
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
    {
      type: 'textarea',
      icon: 'location-plus',
      name: 'descripcion',
      label: 'Descripcion',
      on_label: 'descripcion',
      placeholder: '',
      validators: {
        required: true,
      },
      column: 'col-12 md:col-12 lg:col-12',
    },
    {
      type: 'checkbox',
      name: 'estado',
      visible: this.entities ? true : false,
      label: 'Estado',
      on_label: 'estado',
      column: 'col-12 md:col-4 lg:col-4',
    },
    {
      type: 'hidden',
      name: 'sector',
      on_label: 'sector',
    },
  ];

  constructor(
    private _utilidadesService: UtilidadesService,
    private _notificationService: NotificationService,
    private _entitiesService: EntitiesService,
    private _loadingService: LoadingService
  ) {}

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

  put(data: any): void {
    const entities: Entities = {
      ...data,
      estado: data.estado ? 'activo' : 'inactivo',
      ma_entidad_id: this.entities.id!.toString(),
      id: this.entities.id!.toString(),
    };
    this.subscription.push(
      this._entitiesService
        .put(this.entities.id!, entities)
        .subscribe((res) => {
          console.log(res);

          this._notificationService.showSuccess(res.message);
          this._authService.updateLocalStorage({ entidad: res.data });
        })
    );
  }

  post(data: any): void {
    const entities: Entities = {
      ...data,
      sector: 'SALUD',
    };
    this.subscription.push(
      this._entitiesService
        .post({ ...entities, modulos: environment.MODULOS_VALIDOS_CREACION })
        .subscribe((res) => {
          this._notificationService.showSuccess(res.message);
          this._authService.updateLocalStorage({ entidad: res.data });
        })
    );
  }

  action(e: any) {
    switch (e.event) {
      case 'guardar':
        this.post(e.form);
        break;
      case 'actualizar':
        this.put(e.form);
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    this.getListadoTipoIdentificacion();
    this.getListadoDepartamentos();
  }

  ngAfterViewInit() {
    this._loadingService.loading$.subscribe((loading) => {
      this.formBtnConfig[0].loading = loading;
    });
    if (this.entities) {
      this.dynamicFormComponent.setFormData({
        ...this.entities,
        contactos: this.entities.telefonos,
        estado: this.entities.estado === 'activo' ? true : false,
      });
      this.getListadoCiudadesPorDepartamento(
        this.entities.utilidad_departamento_id
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

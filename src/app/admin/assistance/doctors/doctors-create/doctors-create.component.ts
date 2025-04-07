import { Component, ViewChild } from '@angular/core';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Doctors } from '@interfaces/admin/doctors.interfaces';
import { Department } from '@interfaces/util/department.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { DoctorsService } from '@services/admin/doctors.service';
import { AuthService } from '@services/auth/auth.service';
import { NotificationService } from '@services/util/notificacion.service';
import { UtilidadesService } from '@services/util/utilidades.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { LoadingService } from '@services/util/loading.service';

@Component({
  selector: 'app-doctors-create',
  imports: [DynamicFormComponent, CardModule, ButtonComponent],
  templateUrl: './doctors-create.component.html',
})
export default class DoctorsCreateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;

  private subscription: Subscription[] = [];
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
      name: 'primer_nombre',
      label: 'Primer nombre',
      on_label: 'primer_nombre',
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
      name: 'segundo_nombre',
      label: 'Segundo nombre',
      on_label: 'segundo_nombre',
      placeholder: '',
      validators: {
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-4 lg:col-2',
    },
    {
      type: 'text',
      icon: 'user',
      name: 'primer_apellido',
      label: 'Primer apellido',
      on_label: 'primer_apellido',
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
      name: 'segundo_apellido',
      label: 'Segundo apellido',
      on_label: 'segundo_apellido',
      placeholder: '',
      validators: {
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-4 lg:col-2',
    },
    {
      type: 'date',
      name: 'fecha_nacimiento',
      label: 'Fecha Nacimiento',
      on_label: 'fecha_nacimiento',
      placeholder: '',
      validators: {
        required: true,
      },
      column: 'col-12 md:col-4 lg:col-2',
    },
    {
      type: 'select',
      name: 'sexo',
      label: 'Sexo',
      on_label: 'sexo',
      placeholder: '',
      filter: true,
      filterBy: 'nombre',
      showClear: true,
      options: [
        {
          nombre: 'Masculino',
          id: 'M',
        },
        {
          nombre: 'Femenino',
          id: 'F',
        },
      ],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-4 lg:col-2',
    },
    {
      type: 'email',
      icon: 'envelope',
      name: 'correo',
      label: 'Correo',
      on_label: 'correo',
      placeholder: '',
      validators: {
        required: true,
        email: true,
      },
      column: 'col-12 md:col-8 lg:col-4',
    },
    {
      type: 'tel',
      icon: 'phone',
      name: 'contactos',
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
      type: 'text',
      icon: 'graduation',
      name: 'universidad',
      label: 'Universidad',
      on_label: 'universidad',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-4 lg:col-4',
    },
    {
      type: 'text',
      icon: 'credit-card-front',
      name: 'rethus',
      label: 'Rethus',
      on_label: 'rethus',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-4 lg:col-4',
    },
  ];

  constructor(
    private _utilidadesService: UtilidadesService,
    private _notificationService: NotificationService,
    private _doctorsService: DoctorsService,
    private _loadingService: LoadingService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  goToReturnUrl(): void {
    this._router.navigate(['admin/assistance/doctors']);
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
    const doctor: Doctors = {
      ...data.form,
      ma_entidad_id: this._authService.getEntityStorage.id.toString(),
    };
    this.subscription.push(
      this._doctorsService.post(doctor).subscribe((res) => {
        this._notificationService.showSuccess(res.message);
        setTimeout(() => {
          this._notificationService.confirmation({
            message: '¿Desea crear otro medico?',
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

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Doctors } from '@interfaces/admin/doctors.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { DoctorsService } from '@services/admin/doctors.service';
import { AuthService } from '@services/auth/auth.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { UtilidadesService } from '@services/util/utilidades.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doctors-update',
  imports: [DynamicFormComponent, CardModule, ButtonComponent],
  templateUrl: './doctors-update.component.html',
})
export default class DoctorsUpdateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private subscription: Subscription[] = [];
  private doctorId = '';
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
        minLength: 4,
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
  ];

  constructor(
    private _utilidadesService: UtilidadesService,
    private _notificationService: NotificationService,
    private _doctorsService: DoctorsService,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private _loadingService: LoadingService,
    private _router: Router
  ) {
    this.doctorId = this.route.snapshot.paramMap.get('id')!;
  }

  goToReturnUrl(): void {
    this._router.navigate(['admin/assistance/doctors']);
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
    if (this.doctorId) {
      this.subscription.push(
        this._doctorsService
          .getById({
            estados: ['activo'],
            id: this.doctorId,
            ma_entidad_id: this._authService.getEntityStorage.id!,
          })
          .subscribe((doctor) => {
            this.dynamicFormComponent.setFormData({
              ...doctor.data,
              estado: doctor.data.estado == 'activo' ? true : false,
            });
            this.getListadoCiudadesPorDepartamento(
              doctor.data.utilidad_departamento_id
            );
          })
      );
    }
  }

  put(data: any): void {
    const doctor: Doctors = {
      ...data.form,
      estado: data.form.estado ? 'activo' : 'inactivo',
      ma_entidad_id: this._authService.getEntityStorage.id!,
    };
    this.subscription.push(
      this._doctorsService.put(this.doctorId, doctor).subscribe((res) => {
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

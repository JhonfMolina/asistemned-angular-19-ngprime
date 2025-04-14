import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Patients } from '@interfaces/patients.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { PatientsService } from '@services/patients.service';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { UtilidadesService } from '@services/util/utilidades.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import { ActionButton } from '@interfaces/util/actions.interfaces';

@Component({
  selector: 'app-patients-update',
  imports: [DynamicFormComponent, CardModule, ButtonComponent],
  templateUrl: './patients-update.component.html',
})
export default class PatientsUpdateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private readonly subscription: Subscription[] = [];
  private pacienteId = '';
  formActionButton: ActionButton[] = [
    {
      label: 'Actualizar',
      icon: 'bx bx-refresh bx-sm',
      visible: true,
      width: 'w-full',
      color: 'primary',
      disabled: false,
      loading: false,
      callback: (e: any) => {
        this.put(e);
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
      column: 'col-12 md:col-4 lg:col-3',
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
      column: 'col-12 md:col-4 lg:col-3',
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
      column: 'col-12 md:col-4 lg:col-3',
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
      column: 'col-12 md:col-6 lg:col-3',
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
      column: 'col-12 md:col-6 lg:col-3',
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
      column: 'col-12 md:col-6 lg:col-3',
    },
    {
      type: 'text',
      icon: 'location-plus',
      name: 'barrio',
      label: 'Barrio',
      on_label: 'barrio',
      placeholder: '',
      validators: {
        required: false,
        minLength: 6,
      },
      column: 'col-12 md:col-6 lg:col-2',
    },
    {
      type: 'select',
      name: 'estado_civil',
      label: 'Estado civil',
      on_label: 'estado_civil',
      placeholder: '',
      filter: true,
      filterBy: 'nombre',
      showClear: true,
      options: [
        {
          nombre: 'Solter (a)',
          id: 'soltero',
        },
        {
          nombre: 'Casado (a)',
          id: 'casado',
        },
        {
          nombre: 'Divorciado (a)',
          id: 'divorciado',
        },
        {
          nombre: 'Viudo (a)',
          id: 'viudo',
        },
        {
          nombre: 'Unión Marital de Hecho',
          id: 'union-marital',
        },
      ],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-6 lg:col-3',
    },
    {
      type: 'select',
      name: 'grupo_sanguineo',
      label: 'Grupo Sanguineo',
      on_label: 'grupo_sanguineo',
      placeholder: '',
      filter: true,
      filterBy: 'nombre',
      showClear: true,
      options: [
        {
          nombre: 'Tipo O',
          id: 'O',
        },
        {
          nombre: 'Tipo A',
          id: 'A',
        },
        {
          nombre: 'Tipo B',
          id: 'B',
        },
        {
          nombre: 'Tipo AB',
          id: 'AB',
        },
      ],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-4 lg:col-3',
    },
    {
      type: 'select',
      name: 'factor_sanguineo',
      label: 'Factor Sanguineo',
      on_label: 'factor_sanguineo',
      placeholder: '',
      filter: true,
      filterBy: 'nombre',
      showClear: true,
      options: [
        {
          nombre: 'Positivo',
          id: '+',
        },
        {
          nombre: 'Negativo',
          id: '-',
        },
      ],
      selectedItems: [],
      validators: {
        required: true,
      },
      column: 'col-12 md:col-4 lg:col-3',
    },
    {
      type: 'checkbox',
      name: 'estado',
      label: 'Estado',
      on_label: 'estado',
      column: 'col-12 md:col-4 lg:col-3',
    },
  ];

  constructor(
    private readonly _utilidadesService: UtilidadesService,
    private readonly _notificationService: NotificationService,
    private readonly _patientsService: PatientsService,
    private readonly route: ActivatedRoute,
    private readonly _authService: AuthService,
    private readonly _loadingService: LoadingService,
    private readonly _router: Router
  ) {
    this.pacienteId = this.route.snapshot.paramMap.get('id')!;
  }

  goToReturnUrl(): void {
    this._router.navigate(['admin/assistance/patients']);
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
    if (this.pacienteId) {
      this.subscription.push(
        this._patientsService
          .getById({
            estados: ['activo'],
            id: this.pacienteId,
            ma_entidad_id: this._authService.getEntityStorage.id!,
          })
          .subscribe((paciente) => {
            this.dynamicFormComponent.setFormData({
              ...paciente.data,
              estado: paciente.data.estado == 'activo',
            });
            this.getListadoCiudadesPorDepartamento(
              paciente.data.utilidad_departamento_id
            );
          })
      );
    }
  }

  put(formData: any): void {
    const paciente: Patients = {
      ...formData,
      estado: formData.estado ? 'activo' : 'inactivo',
      ma_entidad_id: this._authService.getEntityStorage.id!,
    };
    this.subscription.push(
      this._patientsService.put(this.pacienteId, paciente).subscribe((res) => {
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

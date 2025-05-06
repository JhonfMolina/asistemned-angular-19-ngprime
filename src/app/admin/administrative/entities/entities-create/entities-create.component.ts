import { Component, inject, ViewChild } from '@angular/core';
import { Entities } from '@interfaces/entities.interfaces';
import { environment } from '../../../../../environments/environment';
import { UtilidadesService } from '@services/util/utilidades.service';
import { NotificationService } from '@services/util/notificacion.service';
import { EntitiesService } from '@services/entities.service';
import { LoadingService } from '@services/util/loading.service';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { StorageService } from '@services/storage.service';
import { Message } from 'primeng/message';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidatorsFormComponent } from '@components/validators-form/validators-form.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { UsersService } from '@services/users.service';
import { PermissionService } from '../../../security/permission/permission.service';

@Component({
  selector: 'app-entities-create',
  imports: [
    Message,
    CardModule,
    CommonModule,
    ValidatorsFormComponent,
    ReactiveFormsModule,
    FormsModule,
    SelectModule,
    FloatLabel,
    FloatLabelModule,
    TextareaModule,
    InputIcon,
    IconField,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './entities-create.component.html',
  styleUrl: './entities-create.component.scss',
})
export default class EntitiesCreateComponent {
  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;
  private subscription: Subscription[] = [];
  private _storageService = inject(StorageService);
  protected readonly entities = this._storageService.getEntityStorage || null;
  form!: FormGroup;
  loading: boolean = false;

  listIdentification: any[] | undefined;
  selectedItemsIdentification: string | undefined;

  listDepartaments: any[] | undefined;
  selectedItemsDepartaments: string | undefined;

  listCities: any[] | undefined;
  selectedItemsCities: string | undefined;

  constructor(
    private _utilidadesService: UtilidadesService,
    private _notificationService: NotificationService,
    private _entitiesService: EntitiesService,
    private _loadingService: LoadingService,
    private readonly _usersService: UsersService,
    private readonly _permissionService: PermissionService,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      utilidad_tipo_identificacion_id: ['', [Validators.required]],
      identificacion: ['', [Validators.required, Validators.minLength(3)]],
      razon_social: ['', [Validators.required]],
      telefonos: ['', [Validators.required]],
      direccion: ['', [Validators.required, Validators.minLength(6)]],
      utilidad_departamento_id: ['', [Validators.required]],
      utilidad_ciudad_id: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      sector: ['SALUD'],
    });
  }

  getListadoTipoIdentificacion(): void {
    this.subscription.push(
      this._utilidadesService
        .getListadoTipoIdentificacion({ estados: ['activo'] })
        .subscribe((response) => {
          this.listIdentification = response.data;
        })
    );
  }

  getListadoDepartamentos(): void {
    this.subscription.push(
      this._utilidadesService
        .getListadoDepartamentos({ estados: ['activo'] })
        .subscribe((response) => {
          this.listDepartaments = response.data;
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
            this.listCities = response.data;
          })
      );
    }
  }

  setPermissions(): void {
    if (this._storageService.getEntityStorage != null) {
      this.subscription.push(
        this._usersService
          .getByIdUserRole({
            estados: ['activo'],
            id: this._storageService.getUserProfileStorage.id!,
            ma_entidad_id: this._storageService.getEntityStorage.id!,
          })
          .subscribe((res) => {
            const userPermissions: Array<string> = [];
            res.data.acl.forEach((perm) => {
              JSON.parse(perm.acl_rol_per_acciones).forEach(
                (permiso: string) => {
                  userPermissions.push(`${perm.acl_per_recurso}.${permiso}`);
                }
              );
            });
            this._permissionService.setPermissions(userPermissions);
          })
      );
    }
  }

  post(): void {
    const entities: Entities = this.form.value;
    this.subscription.push(
      this._entitiesService
        .post({ ...entities, modulos: environment.MODULOS_VALIDOS_CREACION })
        .subscribe((res) => {
          this._notificationService.showSuccess(res.message);
          this._storageService.updateLocalStorage({ entidad: res.data });
          this.setPermissions();
          setTimeout(() => {
            this._notificationService.confirmation({
              message: '¿Desea crear un medico?',
              accept: () => {
                this._router.navigate([
                  '/admin/assistance/doctors/doctors-create',
                ]);
              },
              reject: () => {
                window.location.href = '/admin';
              },
            });
          }, 2000);
        })
    );
  }

  ngOnInit(): void {
    this._loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    if (this.entities) {
      this._router.navigate(['/admin']);
      return;
    }

    this.getListadoTipoIdentificacion();
    this.getListadoDepartamentos();
    this.form.controls['utilidad_departamento_id'].valueChanges.subscribe(
      (value) => {
        if (value) {
          this.getListadoCiudadesPorDepartamento(value);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

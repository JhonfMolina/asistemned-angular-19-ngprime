import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { AuthService } from '@services/auth.service';
import { PermisosService } from '@services/permisos.service';
import { RolesService } from '@services/roles.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { CardModule } from 'primeng/card';
import { Checkbox } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs/internal/Subscription';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-roles-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    Checkbox,
    AccordionModule,
    ButtonComponent,
    InputTextModule,
    ScrollPanelModule,
    FloatLabel,
    CommonModule,
    DividerModule,
  ],
  templateUrl: './roles-create.component.html',
})
export default class RolesCreateComponent {
  private readonly subscription: Subscription[] = [];
  public loading: boolean = false;
  public listadoMudulosPermisos: Array<any> = [];
  public dataSeguridadPermisos: any = {};
  public form: FormGroup;
  public formControl = () => this.form.controls;

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _rolesService: RolesService,
    private readonly _permisosService: PermisosService,
    private readonly _loadingService: LoadingService,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });
  }

  goToReturnUrl(): void {
    this._router.navigate(['admin/security/roles']);
  }

  getListadoPermisos(): void {
    this.subscription.push(
      this._permisosService
        .getlist({
          ma_entidad_id: this._authService.getEntityStorage.id!,
        })
        .subscribe((response) => {
          this.dataSeguridadPermisos = response.data;
          this.setDataPermisoModulo();
        })
    );
  }

  private get getDataPermisos(): Array<any> {
    return this.listadoMudulosPermisos
      .flatMap((item) => {
        return item.dataTable.map((subItem: any) => ({
          acl_permiso_id: subItem.permisoId,
          acciones: subItem.acciones
            .filter((accion: any) => accion.value)
            .map((accion: any) => accion.titulo),
        }));
      })
      .filter((item) => item.acciones.length > 0);
  }

  private get getDataApi(): modelRolesApiRequest {
    return {
      ma_entidad_id: String(this._authService.getEntityStorage.id),
      nombre: String(this.formControl()['nombre'].value).toUpperCase(),
      permisos: this.getDataPermisos,
      estado: 'activo',
    };
  }

  private setDataPermisoModulo() {
    this.listadoMudulosPermisos = [];
    (Object.keys(this.dataSeguridadPermisos) as Array<any>).forEach(
      (modulo) => {
        let listDataTable: Array<any> = [];
        const listadoPermisos: Array<any> = this.dataSeguridadPermisos[modulo]!;
        listadoPermisos.forEach((item) => {
          const list: Array<any> = (
            JSON.parse(item.acciones) as Array<string>
          ).map((acc) => ({ titulo: acc, value: false }));
          const data: any = {
            permisoId: item.id,
            menu: item.recurso,
            acciones: list,
          };
          listDataTable.push(data);
        });

        this.listadoMudulosPermisos.push({
          titulo: modulo,
          displayedColumns: ['menu', 'acciones'],
          dataTable: listDataTable,
        });
      }
    );
    this.clearValuesAccionesPermisosModulo();
  }

  private clearValuesAccionesPermisosModulo() {
    /**Seteo de valores en falso del listado de permisos */
    this.listadoMudulosPermisos.forEach((modulo) => {
      modulo.dataTable.forEach((menu: any) => {
        menu.acciones.forEach((accion: any) => (accion.value = false));
      });
    });
  }

  protected onCheckSeleccionarTodos(modulo: any, input: any) {
    modulo.dataTable.forEach((permiso: any) => {
      (permiso.acciones as Array<any>).forEach(
        (accion) => (accion.value = input.checked)
      );
    });
  }

  post(): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    this.subscription.push(
      this._rolesService.post(this.getDataApi).subscribe((res) => {
        this._notificationService.showSuccess(res.message);
        setTimeout(() => {
          this._notificationService.confirmation({
            message: '¿Desea crear otro rol?',
            accept: () => {
              this.form.reset();
              this.clearValuesAccionesPermisosModulo();
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
      this.loading = loading;
    });
    this.getListadoPermisos();
  }
}

interface modelRolesApiRequest {
  id?: string;
  ma_entidad_id: string;
  nombre: string;
  permisos: Array<any>;
  estado: string;
}

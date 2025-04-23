import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ButtonComponent from '@components/button/button.component';
import { AuthService } from '@services/auth.service';
import { PermisosService } from '@services/permisos.service';
import { RolesService } from '@services/roles.service';
import { StorageService } from '@services/storage.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Checkbox } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-roles-update',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    Checkbox,
    AccordionModule,
    ButtonComponent,
    ButtonModule,
    InputTextModule,
    ScrollPanelModule,
    FloatLabel,
    CommonModule,
    DividerModule,
  ],
  templateUrl: './roles-update.component.html',
})
export default class RolesUpdateComponent {
  private readonly subscription: Subscription[] = [];
  public loading: boolean = false;
  public listadoMudulosPermisos: Array<any> = [];
  public dataSeguridadPermisos: any = {};
  public form: FormGroup;
  public formControl = () => this.form.controls;
  private rolId = '';
  dataSeguridadRol: any = {};

  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _rolesService: RolesService,
    private readonly _permisosService: PermisosService,
    private readonly _loadingService: LoadingService,
    private readonly _storageService: StorageService,
    private readonly route: ActivatedRoute,
    private readonly _router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
    });
    this.rolId = this.route.snapshot.paramMap.get('id')!;
  }

  goToReturnUrl(): void {
    this._router.navigate(['admin/security/roles']);
  }

  getListadoPermisos(): void {
    this.subscription.push(
      this._permisosService
        .getlist({
          ma_entidad_id: this._storageService.getEntityStorage.id!,
        })
        .subscribe((response) => {
          this.dataSeguridadPermisos = response.data;
          this.setDataPermisoModulo();
        })
    );
  }

  private getConsultaSeguridadRol() {
    this._rolesService
      .getById({
        id: this.rolId,
        ma_entidad_id: this._storageService.getEntityStorage.id,
      })
      .subscribe((resp) => {
        this.dataSeguridadRol = resp.data;
        this.formControl()['nombre'].setValue(resp.data.nombre);
        // this.formStateCliente.setValue(resp.data.estado === 'activo');
        this.getListadoPermisos();
      });
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
      ma_entidad_id: String(this._storageService.getEntityStorage.id),
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
          selectAll: false,
          displayedColumns: ['menu', 'acciones'],
          dataTable: listDataTable,
        });
      }
    );
    //Validar si el permiso esta asignado al rol y cambiar el valor de las acciones
    this.listadoMudulosPermisos.forEach((modulo) => {
      this.dataSeguridadRol.permisos[modulo.titulo]?.forEach((permiso: any) => {
        if (modulo.titulo === permiso.acl_per_modulo) {
          modulo.dataTable.forEach((menu: any) => {
            if (menu.permisoId === permiso.acl_permiso_id) {
              menu.acciones.forEach((accion: any) => {
                if (permiso.acciones.includes(accion.titulo)) {
                  accion.value = true;
                }
              });
            }
          });
        }
      });
    });

    //Validar si todos los permisos de un modulo estan seleccionados y cambiar el valor del selectAll
    this.listadoMudulosPermisos.forEach((modulo) => {
      modulo.selectAll = modulo.dataTable.every((permiso: any) =>
        permiso.acciones.every((accion: any) => accion.value)
      );
    });
  }

  protected onCheckSeleccionarTodos(modulo: any, input: any) {
    modulo.dataTable.forEach((permiso: any) => {
      (permiso.acciones as Array<any>).forEach(
        (accion) => (accion.value = input.target.checked)
      );
    });
  }

  put(): void {
    this.subscription.push(
      this._rolesService.put(this.rolId, this.getDataApi).subscribe(() => {
        this._notificationService.showSuccess(
          'Rol de seguridad actualizado exitosamente.'
        );
        this.goToReturnUrl();
      })
    );
  }

  ngOnInit(): void {
    this._loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
    this.getConsultaSeguridadRol();
  }
}

interface modelRolesApiRequest {
  id?: string;
  ma_entidad_id: string;
  nombre: string;
  permisos: Array<any>;
  estado: string;
}

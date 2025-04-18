import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DoctorsService } from '@services/doctors.service';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Doctors } from '@interfaces/doctors.interfaces';
import { Chip } from 'primeng/chip';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { ActionButton } from '@interfaces/util/actions.interfaces';

@Component({
  selector: 'app-doctors-list',
  imports: [TableComponent, Chip],
  templateUrl: './doctors-list.component.html',
})
export default class DoctorsListComponent {
  private subscription: Subscription[] = [];
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  doctors: Doctors[] = [];
  columns: any[] = [];
  actions: ActionButton[] = [
    {
      icon: 'bx bx-edit',
      color: 'success',
      callback: (row: any) => this.onEdit(row),
    },
    {
      icon: 'bx bx-trash',
      color: 'danger',
      callback: (row: any) => this.onDelete(row),
    },
  ];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;
  constructor(
    private _doctorsService: DoctorsService,
    private _authService: AuthService,
    private cdr: ChangeDetectorRef,
    private _router: Router
  ) {}

  onNavigate() {
    this._router.navigate(['admin/assistance/doctors/doctors-create']);
  }

  onEdit(rowData: any): void {
    this._router.navigate([
      'admin/assistance/doctors/doctors-update',
      rowData.id,
    ]);
  }

  onDelete(rowData: any): void {
    console.log('Delete:', rowData);
  }

  onPageChange(event: PageEvent): void {
    this.page = event.page + 1;
    this.rows = event.rows;
    this.getList();
  }

  getList() {
    const params = {
      ma_entidad_id: this._authService.getEntityStorage.id,
      estados: ['activo', 'inactivo'],
      per_page: this.rows,
      page: this.page,
    };
    this.subscription.push(
      this._doctorsService.getlist(params).subscribe((res) => {
        if (res) {
          this.doctors = res.data.data;
          this.totalRecords = res.data.total;
        }
      })
    );
  }

  ngOnInit() {
    this.getList();
  }

  ngAfterViewInit() {
    this.columns = [
      { field: 'nombre_completo', header: 'Nombre Del Medico' },
      { field: 'identificacion', header: 'Identificación' },
      { field: 'correo', header: 'Correo Electrónico' },
      { field: 'contactos', header: 'Contacto' },
      {
        field: 'estado',
        header: 'Estado',
        template: this.statusTemplate,
      },
    ];
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

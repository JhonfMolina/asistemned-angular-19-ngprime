import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { Patients } from '@interfaces/admin/patients.interfaces';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { PatientsService } from '@services/admin/patients.service';
import { AuthService } from '@services/auth/auth.service';
import { Chip } from 'primeng/chip';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-patients-list',
  imports: [TableComponent, Chip],
  templateUrl: './patients-list.component.html',
})
export default class PatientsListComponent {
  private readonly subscription: Subscription[] = [];
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  patients: Patients[] = [];
  columns: any[] = [];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;

  constructor(
    private readonly _patientsService: PatientsService,
    private readonly _authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _router: Router
  ) {}

  onNavigate() {
    this._router.navigate(['admin/assistance/patients/patients-create']);
  }

  onEdit(rowData: any): void {
    this._router.navigate([
      'admin/assistance/patients/patients-update',
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
      this._patientsService.getlist(params).subscribe((res) => {
        if (res) {
          console.log(res);

          this.patients = res.data.data;
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
      { field: 'nombre_completo', header: 'Nombre Del Paciente' },
      { field: 'identificacion', header: 'Identificación' },
      { field: 'sexo', header: 'Genero' },
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

import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { Patients } from '@interfaces/patients.interfaces';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { PatientsService } from '@services/patients.service';
import { Chip } from 'primeng/chip';
import { Subscription } from 'rxjs/internal/Subscription';
import { StorageService } from '@services/storage.service';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-patients-list',
  imports: [TableComponent, Chip, Dialog, CommonModule],
  templateUrl: './patients-list.component.html',
})
export default class PatientsListComponent {
  visible: boolean = false;
  private readonly subscription: Subscription[] = [];
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  patients: Patients[] = [];
  selectedPatients: Patients | null = null;
  columns: any[] = [];
  actions: ActionButton[] = [
    {
      icon: 'bx bx-search',
      color: 'info',
      permission: 'pacientes.ver',
      callback: (row: any) => this.onView(row),
    },
    {
      icon: 'bx bx-edit',
      color: 'success',
      permission: 'pacientes.editar',
      callback: (row: any) => this.onEdit(row),
    },
    {
      icon: 'bx bx-trash',
      color: 'danger',
      permission: 'pacientes.eliminar',
      callback: (row: any) => this.onDelete(row),
    },
  ];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;

  constructor(
    private readonly _patientsService: PatientsService,
    private readonly _storageService: StorageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _router: Router
  ) {}

  onNavigate() {
    this._router.navigate(['admin/assistance/patients/patients-create']);
  }

  onView(rowData: Patients): void {
    this.selectedPatients = rowData;
    this.visible = true;
  }

  onEdit(rowData: Patients): void {
    this._router.navigate([
      'admin/assistance/patients/patients-update',
      rowData.id,
    ]);
  }

  onDelete(rowData: Patients): void {
    console.log('Delete:', rowData);
  }

  onPageChange(event: PageEvent): void {
    this.page = event.page + 1;
    this.rows = event.rows;
    this.getList();
  }

  getList() {
    const params = {
      ma_entidad_id: this._storageService.getEntityStorage.id,
      estados: ['activo', 'inactivo'],
      per_page: this.rows,
      page: this.page,
    };
    this.subscription.push(
      this._patientsService.getlist(params).subscribe((res) => {
        if (res) {
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

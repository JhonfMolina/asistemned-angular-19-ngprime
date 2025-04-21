import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { MedicalConsultationsService } from '@services/medical-consultations.service';
import { AuthService } from '@services/auth.service';
import { Chip } from 'primeng/chip';
import { Subscription } from 'rxjs/internal/Subscription';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-medical-consultations-list',
  imports: [TableComponent, Chip],
  templateUrl: './medical-consultations-list.component.html',
  styleUrl: './medical-consultations-list.component.scss',
})
export default class MedicalConsultationsListComponent {
  private subscription: Subscription[] = [];
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  consultations: any[] = [];
  columns: any[] = [];

  actions: ActionButton[] = [
    {
      label: 'Atender',
      icon: 'bx bx-user-check',
      color: 'primary',
      permission: '',
      callback: (row: any) => this.onAttend(row),
    },
    {
      label: 'Editar',
      icon: 'bx bx-edit',
      color: 'success',
      permission: '',
      callback: (row: any) => this.onEdit(row),
    },
    {
      label: 'Eliminar',
      icon: 'bx bx-trash',
      color: 'danger',
      permission: '',
      callback: (row: any) => this.onDelete(row),
    },
    {
      label: 'Vista Previa',
      icon: 'bx bx-show',
      color: 'info',
      permission: '',
      callback: (row: any) => this.onPreview(row),
    },
  ];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;

  constructor(
    private readonly _storageService: StorageService,
    private readonly _medicalConsultationsService: MedicalConsultationsService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _router: Router
  ) {}

  onNavigate() {
    this._router.navigate([
      'admin/assistance/medical-consultations/medical-consultations-create',
    ]);
  }

  onEdit(rowData: any): void {
    this._router.navigate([
      'admin/assistance/medical-consultations/medical-consultations-update',
      rowData.id,
    ]);
  }

  onDelete(rowData: any): void {
    console.log('Delete:', rowData);
  }

  onAttend(row: any) {
    console.log('Atendiendo paciente:', row);
  }

  onPreview(row: any) {
    console.log('Vista previa:', row);
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
      this._medicalConsultationsService.getlist(params).subscribe((res) => {
        if (res) {
          this.consultations = res.data.data;
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
      { field: 'identificacion', header: 'Nombre del Paciente' },
      { field: 'nombre_completo', header: 'Fecha de la Atención' },
      { field: 'identificacion', header: 'Medico Asignado' },
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

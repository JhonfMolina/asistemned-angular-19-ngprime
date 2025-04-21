import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { Laboratories } from '@interfaces/laboratories.interfaces';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { LaboratoriesService } from '@services/laboratories.service';
import { AuthService } from '@services/auth.service';
import { Chip } from 'primeng/chip';
import { Subscription } from 'rxjs/internal/Subscription';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-laboratories-list',
  imports: [TableComponent, Chip],
  templateUrl: './laboratories-list.component.html',
})
export default class LaboratoriesListComponent {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  private readonly subscription: Subscription[] = [];

  laboratories: Laboratories[] = [];
  columns: any[] = [];
  actions: ActionButton[] = [
    {
      icon: 'bx bx-edit',
      color: 'success',
      permission: '',
      callback: (row: any) => this.onEdit(row),
    },
    {
      icon: 'bx bx-trash',
      color: 'danger',
      permission: '',
      callback: (row: any) => this.onDelete(row),
    },
  ];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;

  constructor(
    private readonly _laboratoriesService: LaboratoriesService,
    private readonly _storageService: StorageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _router: Router
  ) {}

  onNavigate() {
    this._router.navigate([
      'admin/assistance/laboratories/laboratories-create',
    ]);
  }

  onEdit(rowData: any): void {
    this._router.navigate([
      'admin/assistance/laboratories/laboratories-update',
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
      ma_entidad_id: this._storageService.getEntityStorage.id,
      estados: ['activo', 'inactivo'],
      per_page: this.rows,
      page: this.page,
    };
    this.subscription.push(
      this._laboratoriesService.getlist(params).subscribe((res) => {
        if (res) {
          console.log(res);

          this.laboratories = res.data;
          this.totalRecords = res.data.length;
        }
      })
    );
  }

  ngOnInit() {
    this.getList();
  }

  ngAfterViewInit() {
    this.columns = [
      { field: 'razon_social', header: 'Nombre' },
      { field: 'identificacion', header: 'Identificación' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'telefonos', header: 'Teléfonos' },
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

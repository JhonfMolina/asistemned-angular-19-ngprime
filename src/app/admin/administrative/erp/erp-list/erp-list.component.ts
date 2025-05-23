import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { Erp } from '@interfaces/erp.interfaces';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { ErpService } from '@services/erp.service';
import { AuthService } from '@services/auth.service';
import { Chip } from 'primeng/chip';
import { Subscription } from 'rxjs/internal/Subscription';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-erp-list',
  imports: [TableComponent, Chip],
  templateUrl: './erp-list.component.html',
})
export default class ErpListComponent {
  private subscription: Subscription[] = [];
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  erp: Erp[] = [];
  columns: any[] = [];
  actions: ActionButton[] = [
    {
      icon: 'bx bx-edit',
      color: 'success',
      permission: 'convenios.editar',
      callback: (row: any) => this.onEdit(row),
    },
    {
      icon: 'bx bx-trash',
      color: 'danger',
      permission: 'convenios.eliminar',
      callback: (row: any) => this.onDelete(row),
    },
  ];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;
  constructor(
    private _erpServices: ErpService,
    private _storageService: StorageService,
    private cdr: ChangeDetectorRef,
    private _router: Router
  ) {}

  onNavigate() {
    this._router.navigate(['admin/administrative/erp/erp-create']);
  }

  onEdit(rowData: any): void {
    this._router.navigate(['admin/administrative/erp/erp-update', rowData.id]);
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
      this._erpServices.getlist(params).subscribe((res) => {
        if (res) {
          this.erp = res.data.data;
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
      { field: 'razon_social', header: 'Razon social' },
      { field: 'identificacion', header: 'Identificación' },
      { field: 'direccion', header: 'Direccion' },
      { field: 'telefono', header: 'Contacto' },
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

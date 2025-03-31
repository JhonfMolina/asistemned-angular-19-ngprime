import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { ImagingCenters } from '@interfaces/admin/imaging-centers.interfaces';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { ImagingCentersService } from '@services/admin/imaging-centers.service';
import { AuthService } from '@services/auth/auth.service';
import { Chip } from 'primeng/chip';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-imaging-centers-list',
  imports: [TableComponent, Chip],
  templateUrl: './imaging-centers-list.component.html',
})
export default class ImagingCentersListComponent {

  private readonly subscription: Subscription[] = [];
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  imagingCenters: ImagingCenters[] = [];
  columns: any[] = [];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;

  constructor(
    private readonly _imagingCentersService: ImagingCentersService,
    private readonly _authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _router: Router
  ) { }

  onNavigate() {
    this._router.navigate(['admin/assistance/imaging-centers/imaging-centers-create']);
  }

  onEdit(rowData: any): void {
    this._router.navigate([
      'admin/assistance/imaging-centers/imaging-centers-update',
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
      this._imagingCentersService.getlist(params).subscribe((res) => {
        if (res) {
          console.log(res);

          this.imagingCenters = res.data;
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

import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { Pharmacies } from '@interfaces/admin/pharmacies.interfaces';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { PharmaciesService } from '@services/admin/pharmacies.service';
import { AuthService } from '@services/auth/auth.service';
import { Chip } from 'primeng/chip';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-pharmacies-list',
  imports: [TableComponent, Chip],
  templateUrl: './pharmacies-list.component.html',
})
export default class PharmaciesListComponent {

  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  private readonly subscription: Subscription[] = [];

  pharmacies: Pharmacies[] = [];
  columns: any[] = [];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;

  constructor(
    private readonly _pharmaciesService: PharmaciesService,
    private readonly _authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _router: Router
  ) { }

  onNavigate() {
    this._router.navigate(['admin/assistance/pharmacies/pharmacies-create']);
  }

  onEdit(rowData: any): void {
    this._router.navigate([
      'admin/assistance/pharmacies/pharmacies-update',
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
      this._pharmaciesService.getlist(params).subscribe((res) => {
        if (res) {
          console.log(res);

          this.pharmacies = res.data;
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

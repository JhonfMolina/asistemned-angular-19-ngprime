import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '@components/table/table.component';
import { Roles } from '@interfaces/security/roles.interfaces';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import { AuthService } from '@services/auth/auth.service';
import { RolesService } from '@services/security/roles.service';
import { Chip } from 'primeng/chip';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-roles-list',
  imports: [TableComponent, Chip],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export default class RolesListComponent {

  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  private readonly subscription: Subscription[] = [];

  roles: Roles[] = [];
  columns: any[] = [];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;

  constructor(
    private readonly _rolesService: RolesService,
    private readonly _authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
    private readonly _router: Router
  ) { }

  onNavigate() {
    this._router.navigate(['admin/security/roles/roles-create']);
  }

  onEdit(rowData: any): void {
    this._router.navigate([
      'admin/security/roles/roles-update',
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
      this._rolesService.getlist(params).subscribe((res) => {
        if (res) {
          console.log(res);

          this.roles = res.data.data;
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
      { field: 'nombre', header: 'Nombre' },
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

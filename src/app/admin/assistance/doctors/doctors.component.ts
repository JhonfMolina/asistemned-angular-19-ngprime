import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DoctorsService } from '@services/admin/doctors.service';
import { AuthService } from '@services/auth/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TableComponent } from '../../../shared/components/table/table.component';
import { Doctors } from '@interfaces/admin/doctors.interfaces';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-doctors',
  imports: [TableComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss',
})
export default class DoctorsComponent {
  private subscription: Subscription[] = [];
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  doctors: Doctors[] = [];
  columns: any[] = [];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;
  constructor(
    private _doctorsService: DoctorsService,
    private _authService: AuthService
  ) {}

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
  }

  onEdit(rowData: any): void {
    console.log('Edit:', rowData);
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
          console.log(this.columns);
        }
      })
    );
  }

  ngOnInit() {
    this.getList();
  }
}

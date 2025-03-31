import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import ButtonComponent from '../button/button.component';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { LoadingService } from '@services/util/loading.service';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    ButtonComponent,
    CardModule,
    PaginatorModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    TitleCasePipe,
    SkeletonComponent,
  ],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() titleList: string = '';
  @Input() totalRecords: number = 0;
  @Input() first: number = 0;
  @Input() rows: number = 0;
  @Output() navigate = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() filtered = new EventEmitter<any>();

  filteredData: any[] = [];
  filterColumn: string[] = [];
  isLoading: boolean = true;

  constructor(private _loadingService: LoadingService) {}

  onNavigate(): void {
    this.navigate.emit();
  }

  onEdit(rowData: any): void {
    this.edit.emit(rowData);
  }

  onDelete(rowData: any): void {
    this.delete.emit(rowData);
  }

  onPageChange(event: any): void {
    this.pageChange.emit(event);
  }

  ngOnInit(): void {
    this._loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
    this.filterColumn = this.columns.map((col) => col.field);
  }

  applyFilterGlobal(filter: any): void {
    const filterValue = filter.target.value;
    this.filtered.emit(filterValue);
  }
}

import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { Chip } from 'primeng/chip';
import { TableComponent } from '@components/table/table.component';
import { PageEvent } from '@interfaces/util/page-event.interfaces';
import ButtonComponent from '../../shared/components/button/button.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardModule,
    ChartModule,
    DropdownModule,
    TableComponent,
    Chip,
    ButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  patients: any[] = [];
  columns: any[] = [];

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 15;
  page: number = 1;

  polarAreaChartData: any;
  barChartData: any;
  lineChartData: any;
  pieChartData: any;
  radarChartData: any;
  chartOptions: any;

  dropdownOptions = [
    { label: 'Ver', value: 'view' },
    { label: 'Editar', value: 'edit' },
    { label: 'Eliminar', value: 'delete' },
  ];

  constructor(private readonly cdr: ChangeDetectorRef) {
    this.patients = [
      {
        id: 1,
        nombre: 'Pablo Sanchez',
        edad: 55,
        genero: 'Masculino',
        estado: 'activo',
        diagnostico: 'Gripe',
      },
      {
        id: 1,
        nombre: 'Juan Pérez',
        edad: 35,
        genero: 'Masculino',
        estado: 'activo',
        diagnostico: 'Alergia',
      },
      {
        id: 2,
        nombre: 'María Gómez',
        edad: 28,
        genero: 'Femenino',
        estado: 'activo',
        diagnostico: 'Infección estomacal',
      },
      {
        id: 3,
        nombre: 'Carlos Rodríguez',
        edad: 42,
        genero: 'Masculino',
        estado: 'activo',
        diagnostico: 'Diabetes',
      },
      {
        id: 1,
        nombre: 'Pablo Sanchez',
        edad: 55,
        genero: 'Masculino',
        estado: 'inactivo',
        diagnostico: 'Alergia',
      },
      {
        id: 1,
        nombre: 'Juan Pérez',
        edad: 35,
        genero: 'Masculino',
        estado: 'activo',
        diagnostico: 'Gripe',
      },
      {
        id: 2,
        nombre: 'María Gómez',
        edad: 28,
        genero: 'Femenino',
        estado: 'inactivo',
        diagnostico: 'Migraña',
      },
      {
        id: 3,
        nombre: 'Carlos Rodríguez',
        edad: 42,
        genero: 'Masculino',
        estado: 'activo',
        diagnostico: 'Hipertensión',
      },
      {
        id: 1,
        nombre: 'Pablo Sanchez',
        edad: 55,
        genero: 'Masculino',
        estado: 'inactivo',
        diagnostico: 'Gripe',
      },
      {
        id: 1,
        nombre: 'Juan Pérez',
        edad: 35,
        genero: 'Masculino',
        estado: 'activo',
        diagnostico: 'Alergia',
      },
    ];
  }

  onPageChange(event: PageEvent): void {
    this.page = event.page + 1;
    this.rows = event.rows;
  }

  ngAfterViewInit() {
    this.columns = [
      { field: 'nombre', header: 'Nombre Del Paciente' },
      { field: 'edad', header: 'Edad' },
      { field: 'genero', header: 'Genero' },
      { field: 'diagnostico', header: 'Diagnostico' },
      {
        field: 'estado',
        header: 'Estado',
        template: this.statusTemplate,
      },
    ];
    this.cdr.detectChanges();
  }

  ngOnInit() {
    // Opciones generales para los gráficos
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };

    // Datos para el gráfico de Polar Area
    this.polarAreaChartData = {
      labels: ['Masculino', 'Femenino', 'Otro'],
      datasets: [
        {
          data: [300, 500, 100], // Valores de ejemplo
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'], // Colores para cada segmento
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'], // Colores al pasar el mouse
        },
      ],
    };

    // Datos para el gráfico de barras
    this.barChartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Consultas',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55],
        },
      ],
    };

    // Datos para el gráfico de líneas
    this.lineChartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Ingresos ($)',
          borderColor: '#66BB6A',
          data: [12000, 15000, 14000, 17000, 18000, 19000],
          fill: false,
        },
      ],
    };

    // Datos para el gráfico de pastel
    this.pieChartData = {
      labels: ['Pediatría', 'Cardiología', 'Neurología', 'Odontología'],
      datasets: [
        {
          data: [300, 500, 100, 200],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'],
        },
      ],
    };

    // Datos para el gráfico de radar
    this.radarChartData = {
      labels: [
        'Pediatría',
        'Cardiología',
        'Neurología',
        'Odontología',
        'Ortopedia',
      ],
      datasets: [
        {
          label: 'Especialidades',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56],
        },
      ],
    };
  }
}

import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  imports: [CardModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  polarAreaChartData: any;
  barChartData: any;
  lineChartData: any;
  pieChartData: any;
  radarChartData: any;
  chartOptions: any;

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

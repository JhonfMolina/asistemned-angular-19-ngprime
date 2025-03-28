import { Component } from '@angular/core';
import ButtonComponent from '@components/button/button.component';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  imports: [
    CardModule,
    DividerModule,
    ButtonComponent,
    AccordionModule,
    CarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  clients: { name: string; logo: string; description: string }[] = [];
  responsiveOptions: any[] | undefined;

  constructor() {}

  ngOnInit() {
    // Datos de ejemplo para los clientes
    this.clients = [
      {
        name: 'Consultorio Médico Jaller',
        logo: 'https://www.clinicajaller.com/images/Logo_.png',
        description: 'Especialistas en medicina general y pediatría.',
      },
      {
        name: 'Clínica San Rafael',
        logo: 'https://www.clinicassanrafael.com/wp-content/uploads/logo-san-rafael.svg',
        description: 'Atención integral en salud y bienestar.',
      },
      {
        name: 'Centro Médico La Misericordia',
        logo: 'https://www.clinicajaller.com/images/Logo_.png',
        description: 'Cuidado especializado en cardiología y nutrición.',
      },
      {
        name: 'Consultorio Dental Bright Smile',
        logo: 'https://www.clinicassanrafael.com/wp-content/uploads/logo-san-rafael.svg',
        description: 'Expertos en odontología estética y ortodoncia.',
      },
      {
        name: 'Clínica de Especialidades Médicas',
        logo: 'https://www.clinicajaller.com/images/Logo_.png',
        description: 'Servicios médicos avanzados en diversas especialidades.',
      },
      {
        name: 'Clínica San Rafael',
        logo: 'https://www.clinicassanrafael.com/wp-content/uploads/logo-san-rafael.svg',
        description: 'Atención integral en salud y bienestar.',
      },
      {
        name: 'Centro Médico La Misericordia',
        logo: 'https://www.clinicajaller.com/images/Logo_.png',
        description: 'Cuidado especializado en cardiología y nutrición.',
      },
      {
        name: 'Consultorio Dental Bright Smile',
        logo: 'https://www.clinicassanrafael.com/wp-content/uploads/logo-san-rafael.svg',
        description: 'Expertos en odontología estética y ortodoncia.',
      },
      {
        name: 'Clínica de Especialidades Médicas',
        logo: 'https://www.clinicajaller.com/images/Logo_.png',
        description: 'Servicios médicos avanzados en diversas especialidades.',
      },
    ];

    // Opciones responsivas para el carrusel
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}

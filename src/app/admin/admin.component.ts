import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import ButtonComponent from '@components//button/button.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { SidebarService } from '@services/util/sidebar.service';

@Component({
  selector: 'app-admin',
  imports: [
    RouterOutlet,
    ButtonModule,
    CommonModule,
    Toolbar,
    SidebarComponent,
    ButtonComponent,
    Menu,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export default class AdminComponent {
  visible: boolean = false;
  toggle = false;
  items: MenuItem[] | undefined;

  constructor(private router: Router, private sidebarService: SidebarService) {
    this.items = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Gestionar perfil',
            icon: 'bx bx-user',
          },
          {
            label: 'Cerrar sesion',
            icon: 'bx bx-exit',
          },
        ],
      },
    ];
  }

  openSidebar(): void {
    this.sidebarService.open();
  }

  toogleDarkMode(): void {
    this.toggle = !this.toggle;
    const element = document.querySelector('html');
    if (this.toggle) {
      element!.classList.add('my-app-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      element!.classList.remove('my-app-dark');
      localStorage.setItem('theme', 'light');
    }
  }

  onNavigate() {
    this.router.navigate(['/auth/sign-in']);
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.toggle = true;
      document.querySelector('html')!.classList.add('my-app-dark');
    }
  }
}

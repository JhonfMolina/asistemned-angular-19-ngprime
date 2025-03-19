import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, ButtonModule, CommonModule, SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export default class AdminComponent {
  visible: boolean = false;

  constructor() {}
}

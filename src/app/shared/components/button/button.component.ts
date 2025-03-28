import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: [
    `
      :host {
        background: transparent;
        padding: 0;
        margin: 0;
      }
      .disabled {
        opacity: 0.6;
        pointer-events: none;
        cursor: not-allowed;
      }
    `,
  ],
  imports: [ButtonModule],
})
export default class ButtonComponent {
  @Input() width!: string;
  @Input() label!:
    | 'Sign In'
    | 'Cancelar'
    | 'Guardar'
    | 'Actualizar'
    | 'Adquirir ahora'
    | 'Eliminar'
    | 'Nuevo';
  @Input() action!: string;
  @Input() visible!: boolean;
  @Input() appearance!: 'base' | 'raised' | 'rounded' | 'text';
  @Input() variant!: 'outlined' | 'text';
  @Input() color!:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warn'
    | 'danger';
  @Input() icon!: string;
  @Output() onClick = new EventEmitter<any>();
  @Input() disabled!: boolean | string;
  @Input() loading: boolean = false;

  constructor() {}

  handleButtonClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.onClick.emit();
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { NotificationService } from '@services/util/notificacion.service';
import { ValidatorsFormComponent } from '../validators-form/validators-form.component';
import { FormConfigService } from '@services/util/form-config.service';
import ButtonComponent from '../button/button.component';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    InputIcon,
    IconField,
    InputTextModule,
    TextareaModule,
    SelectModule,
    FloatLabel,
    FloatLabelModule,
    ValidatorsFormComponent,
    ButtonComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    Checkbox,
  ],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
  @Output() onClick = new EventEmitter<any>();
  @Input() formConfig: DynamicForm[] = [];
  @Input() formBtnConfig: any[] = [];
  form: FormGroup | any;

  date2: Date | undefined;

  constructor(
    private formConfigService: FormConfigService,
    private _notificationService: NotificationService
  ) {}

  onChange(event: any, field: DynamicForm) {
    if (field.onChange) {
      if (event.value != null) {
        field.onChange(event);
      }
    }
  }

  ngOnInit(): void {
    this.form = this.formConfigService.createFormGroup(this.formConfig);
  }

  onSubmit(action: string): void {
    if (this.form.valid) {
      this.onClick.emit({ form: this.form.value, event: action });
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      this._notificationService.showDanger(
        'Formulario incompleto',
        'Por favor complete los campos requeridos'
      );
    }
  }

  resetForm(): void {
    this.form.reset();
  }

  setFormData(data: any): void {
    this.form.patchValue(data);
  }
}

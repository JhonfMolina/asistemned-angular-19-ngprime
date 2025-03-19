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
  ],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent {
  @Output() onClick = new EventEmitter<any>();
  @Input() formConfig: DynamicForm[] = [];
  @Input() formBtnConfig: any[] = [];
  form: FormGroup | any;

  constructor(
    private formConfigService: FormConfigService,
    private _notificationService: NotificationService
  ) {}

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
        'Incomplete form',
        'Please complete the required fields'
      );
    }
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '@interfaces/auth.interface';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { LoadingService } from '@services/util/loading.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ValidatorsFormComponent } from '@components/validators-form/validators-form.component';
import { NotificationService } from '@services/util/notificacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CardModule,
    CommonModule,
    ValidatorsFormComponent,
    ReactiveFormsModule,
    FloatLabel,
    FloatLabelModule,
    InputIcon,
    IconField,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  private subscription: Subscription[] = [];
  formRegister!: FormGroup;
  loading: boolean = false;

  constructor(
    private readonly _storageService: StorageService,
    private readonly _authService: AuthService,
    protected readonly _router: Router,
    private _loadingService: LoadingService,
    private _notificationService: NotificationService,
    private _fb: FormBuilder
  ) {
    this.formRegister = this._fb.group({
      name: ['', [Validators.required]],
      identificacion: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  passwordMatchValidator(): boolean | undefined {
    if (
      this.formRegister.get('password_confirmation')?.value &&
      this.formRegister.get('password')?.value
    ) {
      const password = this.formRegister.get('password')?.value;
      const confirmPassword = this.formRegister.get(
        'password_confirmation'
      )?.value;

      if (password !== confirmPassword) {
        this._notificationService.showError(
          'Las contraseñas no coinciden',
          'Por favor verifique las contraseñas ingresadas'
        );
        return true;
      }
      return false;
    }
    return undefined;
  }

  register() {
    const formdata: Register = this.formRegister.value;

    if (!this.passwordMatchValidator()) {
      this.subscription.push(
        this._authService.register(formdata).subscribe({
          next: (res) => {
            this._authService.register(formdata).subscribe({
              next: (loginRes) => {
                this._storageService.setAuthorizationToken(loginRes);
                this.getUserProfile();
              },
            });
          },
        })
      );
    }
  }

  private getUserProfile() {
    this.subscription.push(
      this._authService.getUserProfile().subscribe({
        next: (resp) => {
          if (resp && resp.data) {
            this._storageService.updateLocalStorage(resp.data);
            if (
              this._storageService.getAccountVerificationStorage == 'verificar'
            ) {
              this._router.navigate(['/auth/verification']);
            }
          }
        },
      })
    );
  }

  ngOnInit(): void {
    this._loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

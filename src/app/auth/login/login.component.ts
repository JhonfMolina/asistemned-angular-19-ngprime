import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '@interfaces/auth.interface';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { CardModule } from 'primeng/card';

import { Subscription } from 'rxjs/internal/Subscription';
import { ValidatorsFormComponent } from '../../shared/components/validators-form/validators-form.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  private subscription: Subscription[] = [];
  formLogin!: FormGroup;
  loading: boolean = false;

  constructor(
    private readonly _storageService: StorageService,
    private readonly _authService: AuthService,
    protected readonly _router: Router,
    private _loadingService: LoadingService,
    private _notificationService: NotificationService,
    private _fb: FormBuilder
  ) {
    this.formLogin = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const formdata: Login = this.formLogin.value;
    this.subscription.push(
      this._authService.login(formdata).subscribe({
        next: (res) => {
          this._storageService.setAuthorizationToken(res);
          this.getUserProfile();
        },
      })
    );
  }

  private getUserProfile() {
    this.subscription.push(
      this._authService.getUserProfile().subscribe({
        next: (resp) => {
          if (resp && resp.data) {
            this._storageService.updateLocalStorage(resp.data);
            this.goTo();
          }
        },
      })
    );
  }

  private goTo() {
    if (this._storageService.getAccountVerificationStorage == 'verificar') {
      this._router.navigate(['/auth/verification']);
    }
    if (this._storageService.getAccountVerificationStorage == 'activo') {
      this._notificationService.showSuccess(
        `Hola ${this._storageService.getUserProfileStorage.name}!`,
        'Explora y disfruta de todas nuestras funcionalidades.'
      );
      if (this._storageService.getEntityStorage == null) {
        this._router.navigate([
          '/admin/administrative/entities/entities-create',
        ]);
      } else {
        this._router.navigate(['/admin']);
      }
    }
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

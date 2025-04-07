import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Login } from '@interfaces/auth/auth.interface';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { AuthService } from '@services/auth/auth.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { CardModule } from 'primeng/card';

import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  imports: [DynamicFormComponent, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  private subscription: Subscription[] = [];
  formBtnConfig = [
    {
      label: 'Iniciar Sesión',
      icon: 'door-open bx-sm',
      visible: true,
      width: 'w-full',
      appearance: 'base',
      color: 'primary',
      action: 'sign-in',
      disabled: false,
      loading: false,
    },
  ];
  formConfig: DynamicForm[] = [
    {
      type: 'email',
      icon: 'envelope',
      name: 'email',
      label: 'Email',
      on_label: 'Email',
      placeholder: '',
      validators: {
        required: true,
        email: true,
      },
      column: 'col-12 md:col-6 lg:col-12',
    },
    {
      type: 'password',
      icon: 'key',
      name: 'password',
      label: 'Password',
      on_label: 'password',
      placeholder: '',
      validators: {
        required: true,
        minLength: 6,
      },
      column: 'col-12 md:col-6 lg:col-12',
    },
  ];

  constructor(
    private _authService: AuthService,
    protected readonly _router: Router,
    private _loadingService: LoadingService,
    private _notificationService: NotificationService
  ) {}

  login(e: any) {
    const formdata: Login = e.form;
    this.subscription.push(
      this._authService.login(formdata).subscribe({
        next: (res) => {
          this._authService.setAuthorizationToken(res);
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
            this._authService.updateLocalStorage(resp.data);
            this.goTo();
          }
        },
      })
    );
  }

  private goTo() {
    if (this._authService.getAccountVerificationStorage == 'verificar') {
      this._router.navigate(['/auth/verification']);
    }
    if (this._authService.getAccountVerificationStorage == 'activo') {
      this._notificationService.showSuccess(
        `Hola ${this._authService.getUserProfileStorage.name}!`,
        'Explora y disfruta de todas nuestras funcionalidades.'
      );
      if (this._authService.getEntityStorage == null) {
        this._router.navigate(['/admin/administrative/entities']);
      } else {
        this._router.navigate(['/admin']);
      }
    }
  }

  ngOnInit(): void {
    this._loadingService.loading$.subscribe((loading) => {
      this.formBtnConfig[0].loading = loading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

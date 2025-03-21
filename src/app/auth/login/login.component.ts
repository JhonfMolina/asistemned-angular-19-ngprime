import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { AuthService } from '@services/auth/auth.service';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, ToastModule, DynamicFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  private subscription: Subscription[] = [];
  formBtnConfig = [
    {
      label: 'Sign In',
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
    private _router: Router,
    private _loadingService: LoadingService,
    private _notificationService: NotificationService
  ) {}

  action(e: any) {
    switch (e.event) {
      case 'sign-in':
        this.onSignIn(e.form);
        break;
      default:
        break;
    }
  }

  onSignIn(e: any) {
    this.subscription.push(
      this._authService.signIn(e.email, e.password).subscribe({
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
    if (this._authService.getUserProfileStorage.status == 'verificar') {
      this._router.navigate(['/verificacion']);
    }
    if (this._authService.getUserProfileStorage.status == 'activo') {
      this._router.navigate(['/admin']);
      this._notificationService.showSuccess(
        `Hola ${this._authService.getUserProfileStorage.name}!`,
        'Explora y disfruta de todas nuestras funcionalidades.'
      );
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

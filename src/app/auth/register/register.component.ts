import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicFormComponent } from '@components/dynamic-form/dynamic-form.component';
import { Register } from '@interfaces/auth.interface';
import { ActionButton } from '@interfaces/util/actions.interfaces';
import { DynamicForm } from '@interfaces/util/dynamic-form.interface';
import { AuthService } from '@services/auth.service';
import { LoadingService } from '@services/util/loading.service';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [DynamicFormComponent, CardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  private subscription: Subscription[] = [];
  formActionButton: ActionButton[] = [
    {
      label: 'Registrarse',
      visible: true,
      width: 'w-full',
      color: 'primary',
      disabled: false,
      loading: false,
      callback: (e: any) => {
        this.register(e);
      },
    },
  ];
  formConfig: DynamicForm[] = [
    {
      type: 'text',
      icon: 'user',
      name: 'name',
      label: 'Nombre completo',
      on_label: 'name',
      placeholder: '',
      validators: {
        required: true,
      },
      column: 'col-12 md:col-6 lg:col-12',
    },
    {
      type: 'number',
      icon: 'id-card',
      name: 'identificacion',
      label: 'Identificacion',
      on_label: 'identificacion',
      placeholder: '',
      validators: {
        required: true,
        minLength: 3,
        maxLength: 20,
      },
      column: 'col-12 md:col-6 lg:col-12',
    },
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
      label: 'Contraseña',
      on_label: 'password',
      placeholder: '',
      validators: {
        required: true,
        minLength: 6,
      },
      column: 'col-12 md:col-6 lg:col-12',
    },
    {
      type: 'password',
      icon: 'key',
      name: 'password_confirmation',
      label: 'Confirmar contraseña',
      on_label: 'password_confirmation',
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
    private _loadingService: LoadingService
  ) {}

  register(formData: any) {
    const formdata: Register = formData;

    // this.subscription.push(
    //   this._authService.register(formdata).subscribe({
    //     next: (res) => {
    //       this._authService
    //         .login({ email: formdata.email, password: formdata.password })
    //         .subscribe({
    //           next: (loginRes) => {
    //             this._authService.setAuthorizationToken(loginRes);
    //             this.getUserProfile();
    //           },
    //         });
    //     },
    //   })
    // );
  }

  private getUserProfile() {
    this.subscription.push(
      this._authService.getUserProfile().subscribe({
        next: (resp) => {
          if (resp && resp.data) {
            this._authService.updateLocalStorage(resp.data);
            if (
              this._authService.getAccountVerificationStorage == 'verificar'
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
      this.formActionButton[0].loading = loading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputOtpModule } from 'primeng/inputotp';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '@services/util/loading.service';
import { NotificationService } from '@services/util/notificacion.service';
import ButtonComponent from '@components/button/button.component';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-account-verification',
  imports: [
    FormsModule,
    InputOtpModule,
    CommonModule,
    CardModule,
    ButtonComponent,
  ],
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.scss',
})
export default class AccountVerificationComponent {
  private subscription: Subscription[] = [];
  code: any;
  canResendCode: boolean = false; // Controla si se puede reenviar el código
  timer: number = 60; // Tiempo de espera en segundos
  timerSubscription!: Subscription;
  loading: boolean = false;
  private entitiesId: any;
  constructor(
    private _authService: AuthService,
    protected readonly _router: Router,
    private _loadingService: LoadingService,
    private _notificationService: NotificationService
  ) {
    this.entitiesId = this._authService.getEntityStorage || null;
  }

  ngOnInit() {
    this.startTimer();
    this._loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe());
  }

  private startTimer() {
    this.canResendCode = false;
    this.timer = 60;

    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.canResendCode = true;
        this.timerSubscription.unsubscribe();
      }
    });
  }

  resendCodeAccountVerification() {
    if (!this.canResendCode) return;

    this.subscription.push(
      this._authService.resendCodeAccountVerification().subscribe({
        next: () => {
          this._notificationService.showSuccess(
            'El código de verificación ha sido reenviado.'
          );
          this.startTimer();
        },
        error: () => {
          this._notificationService.showError(
            'Hubo un error al reenviar el código. Por favor, inténtelo nuevamente.'
          );
        },
      })
    );
  }

  accountVerification() {
    this.subscription.push(
      this._authService
        .accountVerification({ codigo_activacion: this.code })
        .subscribe({
          next: () => {
            this._authService.updateLocalStorage({ status: 'activo' });
            setTimeout(() => {
              if (this.entitiesId) {
                this._router.navigate(['/admin']);
              } else {
                this._router.navigate(['/admin/administrative/entities']);
              }
              this._notificationService.showSuccess(
                `Hola ${this._authService.getUserProfileStorage.name}!`,
                'Explora y disfruta de todas nuestras funcionalidades.'
              );
            }, 500);
          },
        })
    );
  }
}

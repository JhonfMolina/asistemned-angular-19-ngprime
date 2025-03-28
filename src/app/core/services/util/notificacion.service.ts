import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  showSuccess(summary: string, detail?: string): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life: 3000,
    });
  }

  showError(summary: string, detail?: string): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 3000,
    });
  }

  showInfo(summary: string, detail?: string): void {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      life: 3000,
    });
  }

  showWarn(summary: string, detail?: string): void {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      life: 3000,
    });
  }

  showDanger(summary: string, detail?: string): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life: 3000,
    });
  }

  confirmation(config: {
    message: string;
    header?: string;
    icon?: string;
    rejectButtonLabel?: string;
    acceptButtonLabel?: string;
    accept: () => void;
    reject?: () => void;
  }): void {
    this.confirmationService.confirm({
      message: config.message,
      header: config.header || 'Confirmación',
      icon: config.icon || 'bx bx-error',
      rejectButtonProps: {
        label: config.rejectButtonLabel || 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: config.acceptButtonLabel || 'Continuar',
      },
      accept: config.accept,
      reject: config.reject,
    });
  }
}

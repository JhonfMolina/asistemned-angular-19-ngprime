import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { CustomTitleStrategy } from './core/services/util/custom-title-strategy.service';
import MyPreset from './theme/mypresent';
import { MessageService } from 'primeng/api';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { requestInterceptor } from './core/interceptors/request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy,
    },
    provideHttpClient(
      withInterceptors([headersInterceptor, requestInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
      ripple: true,
    }),
    MessageService,
  ],
};
